import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Question, QuestionList} from "../../../models/question";
import {Exam} from "../../../models/exam";
import {HierarchyNode} from "../../../models/hierarchy-node";
import {Section} from "../../../models/section";
import {NodeService} from "../../../services/node.service";
import {ExamService} from "../../../services/exam_service";
import {MatDialog} from "@angular/material/dialog";
import {SnackbarService} from "../../../services/snackbar.service";
import {ExamSectionModalComponent} from "../exam-section-modal/exam-section-modal.component";

@Component({
  selector: 'app-edit-exam',
  templateUrl: './edit-exam.component.html',
  styleUrl: './edit-exam.component.css'
})
export class EditExamComponent {
  id: number = 0;
  exam?: Exam;
  examForm: FormGroup;
  sections: FormArray;
  types: string[] = ['Test', 'Desarrollo'];
  hierarchyNodes: HierarchyNode[] = [];
  exams: Exam[] = [];
  sectionList: Section[] = [];
  selectedQuestions: Question[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private nodeService: NodeService,
    private examService: ExamService,
    private router: Router,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private snackbarService: SnackbarService
  ) {
    this.sections = this.formBuilder.array([], this.validateSectionQuestions());

    this.examForm = this.formBuilder.group({
      title: ['', Validators.required],
      previous: [[]],
      sections: this.sections
    });
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.examService.getExam(this.id).subscribe(exam => {
        this.exam = exam;
        this.populateExamForm();
      });

    });
  }

  populateExamForm(): void {
    if (this.exam?.subject_id !== undefined) {
      this.nodeService.getSubjectNodes(this.exam?.subject_id).subscribe(nodes => {
        this.hierarchyNodes = nodes.items;
        this.examService.getSubjectExams(this.id).subscribe(exams=>{
          this.exams = exams.items;
        })
      });
    }
    this.examForm.get('title')?.patchValue(this.exam?.title);
    this.selectedQuestions = (this.exam?.questions?.items !== undefined) ? this.exam?.questions.items : [];
    let sectionCount = 0;
    this.selectedQuestions.sort((a, b): number => {
      let as = (a.section_number !== undefined) ? a.section_number : 0;
      let bs = (b.section_number !== undefined) ? b.section_number : 0;
      return as - bs;
    }
    )
    for (let a = 0; a < this.selectedQuestions.length; a++){
      let question = this.selectedQuestions[a];
      let nodeId = (question.node_ids?.at(0) !== undefined) ? question.node_ids.at(0) : NaN;
      if(question.section_number !== undefined && question.section_number > sectionCount){
        sectionCount = question.section_number;
        this.sectionList.push(new Section(sectionCount, undefined, 1, undefined, undefined, undefined, undefined,new QuestionList([])))
        this.sections.push(this.formBuilder.group({
          node: [[], [Validators.required]],
          questionNumber: [1, [Validators.required, Validators.min(1)]],
          type: [[]],
          difficulty: [NaN, [Validators.min(1), Validators.max(10)]],
          time: [NaN, [Validators.required, Validators.min(1)]],
          isParametrized: [false],
          isNew: [false],
          questions: [[]]
        }))
      }
      else {
        this.sections.at(this.sections.length - 1).get('questionNumber')?.patchValue(this.sections.at(this.sections.length - 1).get('questionNumber')?.value + 1)
      }
      let nodes = this.sections.at(this.sections.length - 1).get('node')?.value;
      nodes.push(nodeId);
      this.sections.at(this.sections.length - 1).get('node')?.patchValue( nodes)
       this.sectionList[this.sectionList.length - 1].questions?.items.push(question)

        this.sections.at(this.sections.length - 1).updateValueAndValidity();
        this.examForm.updateValueAndValidity();
    }

  }

  addSection() : void {
    this.sections.push(this.formBuilder.group({
      node: ['', [Validators.required]],
      questionNumber: ['', [Validators.required, Validators.min(1)]],
      type: [[]],
      difficulty: [NaN, [Validators.min(1), Validators.max(10)]],
      time: [NaN, [Validators.required, Validators.min(1)]],
      isParametrized: [false],
      isNew: [false],
      questions: [[]]
    }));
    this.sectionList.push(new Section(this.sectionList.length));
  }

  removeSection(index: number) {
    this.sections.removeAt(index);
    this.sectionList.splice(index, 1);
    this.examForm.updateValueAndValidity();
  }

  get sectionsControls() {
    return (this.examForm.get('sections') as FormArray).controls;
  }

  submitForm(): void {
    if (this.examForm.valid) {
      const examData = this.examForm.value;
      let questionIds: number[] = [];
      let questionList = new QuestionList([]);

      const sectionNumber = this.sectionList.length;

      for (let i = 0; i < sectionNumber; i++) {
        let total = this.sectionList[i].questions?.items.length;
        if (total !== undefined) {
          for (let j = 0; j < total; j++) {
            let question = this.sectionList[i].questions?.items[j];
            if (question !== undefined) {
              question.section_number = i + 1;
              questionList.items.push(question);
              questionIds.push(question.id);
            }
          }
        }
      }

      const exam  = new Exam(
        this.id,
        examData.title,
        this.exam?.difficulty,
        this.exam?.time,
        questionList,
        this.exam?.subject_id,
        this.exam?.connected,
        questionList.items.length
      );
      this.exam = exam;
      this.examService.editExam(this.exam).subscribe(
        () => {
          this.snackbarService.showSuccess('Examen modificado correctamente.');
          this.router.navigate(['/exam-list/' + this.exam?.subject_id]);
        }
      );
    } else {
      console.log('Invalid form');
    }
  }

  generateRemainingQuestions(): void {
    for (let i = 0; i < this.sectionList.length; i++) {
      this.populateSection(i);

      let wantedQuestions = this.sectionList[i].question_number ?? 0;
      let currentQuestions = this.sectionList[i].questions?.items.length ?? 0;

      if (wantedQuestions > currentQuestions) {
        this.examService.generateRemainingQuestions(this.sectionList[i], wantedQuestions - currentQuestions).subscribe(
          questionList => {
            if (!this.sectionList[i].questions) {
              this.sectionList[i].questions = questionList;
            } else {
              for (let a = 0; a < questionList.total; a++) {
                this.sectionList[i].questions?.items.push(questionList.items[a]);
                this.selectedQuestions.push(questionList.items[a]);
              }
            }
            this.sections.at(i).updateValueAndValidity();
          }
        );
      }
    }
    this.examForm.updateValueAndValidity();
  }

  populateSection(id: number): void {
    const sectionData = this.sections.at(id).value;
    this.sectionList[id].node_ids = sectionData.node;
    this.sectionList[id].difficulty = sectionData.difficulty;
    this.sectionList[id].time = sectionData.time;
    this.sectionList[id].repeat = sectionData.isNew;
    this.sectionList[id].type = sectionData.type;
    this.sectionList[id].question_number = sectionData.questionNumber;
    let excluded = this.sectionList[id].exclude_ids;

    if (!excluded || excluded.length < this.selectedQuestions.length) {
      if (!this.sectionList[id].exclude_ids) {
        this.sectionList[id].exclude_ids = [];
      }
      for (let i = 0; i < this.selectedQuestions.length; i++) {
        this.sectionList[id].exclude_ids?.push(this.selectedQuestions[i].id);
      }
    }
  }

  openExamSection(id: number): void {
    this.populateSection(id);
    let maxQuestions = (this.sectionList[id].questions !== undefined) ?
      <number>this.sectionList[id].question_number - <number>this.sectionList[id].questions?.items.length :
      <number>this.sectionList[id].question_number;
    const dialogRef = this.dialog.open(ExamSectionModalComponent, {
      width: '950px',
      data: {
        section: this.sectionList[id],
        subjectId: this.id,
        maxQuestions: maxQuestions,
      }
    });
    dialogRef.afterClosed().subscribe((result: QuestionList) => {
      if (result && result.total > 0) {
        if (!this.sectionList[id].questions) {
          this.sectionList[id].questions = new QuestionList([]);
        }
        for (let a = 0; a < result.total; a++) {
          this.sectionList[id].questions?.items.push(result.items[a]);
          this.selectedQuestions.push(result.items[a]);
        }
        this.sections.at(id).updateValueAndValidity();
        this.examForm.updateValueAndValidity();
      }
    });
  }

  calculateAverageDifficulty(): string {
    let avg = 0;
    let total = 0;
    for (let i = 0; i < this.sectionList.length; i++) {
      let questions = this.sectionList[i].questions;
      if (questions) {
        for (let j = 0; j < questions.items.length; j++) {
          avg += questions.items[j].difficulty;
          total++;
        }
      }
    }
    avg /= total;
    return `${avg.toFixed(3)} / 10`;
  }

  calculateTotalTime(): string {
    let total = 0;
    for (let i = 0; i < this.sectionList.length; i++) {
      let questions = this.sectionList[i].questions;
      if (questions) {
        for (let j = 0; j < questions.items.length; j++) {
          total += questions.items[j].time;
        }
      }
    }
    return `${total} min`;
  }

  calculateTotalQuestions(): string {
    let total = 0;
    for (let i = 0; i < this.sectionList.length; i++) {
      let questions = this.sectionList[i].questions;
      if (questions) {
        total += questions.items.length;
      }
    }
    return `${total}`;
  }

  eliminateQuestion(questionId: number, sectionId: number) {
    const section = this.sectionList[sectionId];
    if (section && section.questions) {
      const questionIndex = section.questions.items.findIndex(q => q.id === questionId);
      if (questionIndex > -1) {
        section.questions.items.splice(questionIndex, 1);
      }
      this.sections.at(sectionId).updateValueAndValidity();
    }
    this.examForm.updateValueAndValidity();
  }

  validateSectionQuestions(): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
      const sections = formArray as FormArray;
      const size = (this.sectionList.length < sections.length) ? this.sectionList.length : sections.length;
      for (let i = 0; i < size; i++) {
        const section = sections.at(i);
        const questionNumber = section.get('questionNumber')?.value;
        const questions = (this.sectionList[i].questions === undefined) ? 0 : <number>this.sectionList[i].questions?.items.length;
        if (questionNumber <= 0 || questions !== questionNumber) {
          return { invalidQuestionNumber: true };
        }
      }
      return null;
    };
  }

  compareExams(): void {
    const previous = (this.examForm.get('previous')?.value !== undefined) ? this.examForm.get('previous')?.value : 0;
    this.examService.getRecentQuestions(this.id, previous).subscribe(questions => {
      const questionIds = questions.items.map(q => q.id);
      this.sectionList.forEach(section => {
        section.questions?.items.forEach(question => {
          if (questionIds.includes(question.id)) {
            question.repeated = true;
          }
        });
      });
    });
  }
}
