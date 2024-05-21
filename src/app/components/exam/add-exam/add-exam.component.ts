import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Question, QuestionList} from "../../../models/question";
import {HierarchyNode} from "../../../models/hierarchy-node";
import {NodeService} from "../../../services/node.service";
import {ExamService} from "../../../services/exam_service";
import {MatDialog} from "@angular/material/dialog";
import {ExamSectionModalComponent} from "../exam-section-modal/exam-section-modal.component";
import {Section} from "../../../models/section";
import {Exam} from "../../../models/exam";
import {SnackbarService} from "../../../services/snackbar.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrl: './add-exam.component.css'
})
export class AddExamComponent {
  id: number = 0;
  examForm: FormGroup;
  sections: FormArray;
  types: string[] = ['Test', 'Desarrollo']
  hierarchyNodes: HierarchyNode[] = [];
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
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      // Llamar al servicio para obtener los nodos correspondientes
      this.nodeService.getSubjectNodes(this.id).subscribe(nodes => {
        this.hierarchyNodes = nodes.items;
      });
    });
  this.examForm = this.formBuilder.group({
    title: ['', Validators.required],
    // TODO: Comprobar si required puede servir aquí
    sections: this.formBuilder.array([]),
  });
  this.sections = this.examForm.get('sections') as FormArray;

  this.addSection();
}

  addSection() {
    this.sections.push(this.formBuilder.group({
      node: ['', [Validators.required]],
      questionNumber: [NaN, [Validators.required, Validators.min(1)]],
      type: [[]],
      difficulty: [NaN, [Validators.min(1), Validators.max(10)]],
      time: [NaN, [Validators.required, Validators.min(1)]],
      isParametrized: [false],
      isNew: [false],

    }))
    this.sectionList.push(new Section(this.sectionList.length));
  }

  removeSection(index: number) {
    this.sections.removeAt(index);
    this.sectionList.splice(index);
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
          let total = this.sectionList[i].questions?.total;
          if (total !== undefined) {
            for (let j = 0; j < total; j++) {
              let question = this.sectionList[i].questions?.items[j];
              if (question !== undefined) {
                questionList.items.push(question)
                questionIds.push(question.id)
              }
            }
          }
        }

      const exam = new Exam(
        NaN,
        examData.title,
        NaN,
        NaN,
        questionList,
        this.id,
        undefined,
        undefined,
        questionIds
      );
      console.log(exam)
      // Now you can use 'question' object to save or do whatever you want
      this.examService.addExam(exam).subscribe(
        () => {
          this.snackbarService.showSuccess('Examen creado correctamente.');
          this.router.navigate(['/exam-list/' + this.id])
        }
      );
    } else {
      console.log('Invalid form');
    }
  }

  generateRemainingQuestions(): void {
    for (let i = 0; i < this.sectionList.length; i++){
      this.populateSection(i);

      let wantedQuestions = (this.sectionList[i].question_number !== undefined) ? <number>this.sectionList[i].question_number : 0;
      let currentQuestions = (this.sectionList[i].questions?.items.length !== undefined) ? <number>this.sectionList[i].questions?.items.length : 0;

      if (wantedQuestions > currentQuestions){
        this.examService.generateRemainingQuestions(this.sectionList[i], wantedQuestions - currentQuestions).subscribe(
      questionList => {
        if (this.sectionList[i].questions === undefined){
          this.sectionList[i].questions = questionList;
        }
        else {
          for (let a: number = 0; a < questionList.total; a++) {
            this.sectionList[i].questions?.items.push(questionList.items[a]);
            this.selectedQuestions.push(questionList.items[a]);
          }
        }

        }
    );
      }
    }
  }

  populateSection(id: number): void {
    const sectionData = this.sections.at(id).value;
    this.sectionList[id].node_id = sectionData.node;
    this.sectionList[id].difficulty = sectionData.difficulty;
    this.sectionList[id].time = sectionData.time;
    this.sectionList[id].repeat = sectionData.isNew;
    this.sectionList[id].type = sectionData.type;
    this.sectionList[id].question_number = sectionData.questionNumber;
    let excluded = this.sectionList[id].exclude_ids;

    if (excluded === undefined || (excluded.length < this.selectedQuestions.length)){
      if (this.sectionList[id].exclude_ids === undefined){
        this.sectionList[id].exclude_ids = [];
      }
      for (let i = 0; i < this.selectedQuestions.length; i++){
        this.sectionList[id].exclude_ids?.push(this.selectedQuestions[i].id)
      }
      console.log(this.sectionList[id].exclude_ids)
    }
  }

  openExamSection(id: number):void {
    this.populateSection(id);
    let nodeId = (this.sectionList[id].node_id !== undefined) ? this.sectionList[id].node_id : NaN;
    const dialogRef = this.dialog.open(ExamSectionModalComponent, {
      width: '950px',
      data: {
        section: this.sectionList[id],
        subjectId: this.id,
        nodeId: nodeId
      }
    });
     dialogRef.afterClosed().subscribe((result: QuestionList) => {
      if (result && result.total > 0) {
        if (this.sectionList[id].questions === undefined){
          this.sectionList[id].questions = new QuestionList([]);
        }
        for (let a = 0; a < result.total; a++) {
          this.sectionList[id].questions?.items.push(result.items[a]);
          this.selectedQuestions.push(result.items[a]);
        }
        console.log('Selected Questions:', this.sectionList[id].questions);

      }
    });
  }

  calculateAverageDifficulty(): string {
    let avg = 0;
    let total = 0;
    for(let i = 0; i < this.sectionList.length; i++){
      let questions = this.sectionList[i].questions;
      if (questions !== undefined){
        for (let j = 0; j < questions.total; j++){
          avg = avg + questions.items[j].difficulty;
          total += 1;
        }
      }
    }
    avg = avg/total;

    return `${avg.toFixed(3)} / 10`;
  }

  calculateTotalTime(): string {
    let total = 0;
    for(let i = 0; i < this.sectionList.length; i++){
      let questions = this.sectionList[i].questions;
      if (questions !== undefined){
        for (let j = 0; j < questions.total; j++){
          total = total + questions.items[j].time;
        }
      }
    }

    return `${total} min`;
  }

  calculateTotalQuestions(): string {
    let total = 0;
    for(let i = 0; i < this.sectionList.length; i++){
      let questions = this.sectionList[i].questions;
      if (questions !== undefined){
        total = total + questions.total;
        }
      }

    return `${total}`;
  }

  eliminateQuestion(questionId: number, sectionId: number){
    console.log(this.sectionList[sectionId].questions?.items[questionId])
  }
}
