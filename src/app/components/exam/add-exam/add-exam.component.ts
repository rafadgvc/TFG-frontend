import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Question} from "../../../models/question";
import {AnswerList} from "../../../models/answer";
import {HierarchyNode} from "../../../models/hierarchy-node";
import {NodeService} from "../../../services/node.service";
import {ExamService} from "../../../services/exam_service";
import {DisableQuestionComponent} from "../../question/disable-question/disable-question.component";
import {MatDialog} from "@angular/material/dialog";
import {ExamSectionModalComponent} from "../exam-section-modal/exam-section-modal.component";

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrl: './add-exam.component.css'
})
export class AddExamComponent {
  id: number = 0;
  sectionNumber: number = 0;
  examForm: FormGroup;
  sections: FormArray;
  types: string[] = ['Test', 'Desarrollo', 'Ninguno']
  hierarchyNodes: HierarchyNode[] = [];
  questionList: Question[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private nodeService: NodeService,
    private examService: ExamService,
    private router: Router,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id']; // Convertir a número
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
      questions: [''],
    }))
    this.sectionNumber += 1;
  }

  removeSection(index: number) {
    this.sections.removeAt(index);
    this.sectionNumber -= 1;
  }

  onSubmit() {
    if (this.examForm.valid) {
      const questionData = this.examForm.value;
      const question = new Question(
        0, // Assign ID appropriately
        questionData.title,
        questionData.difficulty,
        questionData.time,
        questionData.type,
        true,
        new AnswerList(questionData.answers)
      );
      // Now you can use 'question' object to save or do whatever you want
      console.log(question);
    } else {
      console.log('Invalid form');
    }
  }

  get sectionsControls() {
    return (this.examForm.get('sections') as FormArray).controls;
  }

  submitForm(): void {
    if (this.examForm.valid) {
      // TODO: Añadir creación del examen
      this.router.navigate(['/exam-list/' + this.id]);

    }
  }

  openExamSection(id: number):void {
    const dialogRef = this.dialog.open(ExamSectionModalComponent, {
      width: '400px',
      data: {
        sectionId: id,
        nodes: this.hierarchyNodes,
        subjectId: this.id
      }
    });
    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        console.log(result)
      }
    });
  }

  calculateAverageDifficulty(): string {
    let avg = 0;
    if (this.questionList.length !== 0){
      for (let i = 0; i < this.questionList.length; i++){
        avg = avg + this.questionList[i].difficulty;
      }
      avg = avg/this.questionList.length;
    }
    return `${avg} / 10`;
  }

  calculateTotalTime(): string {
    let total = 0;
    if (this.questionList.length !== 0){
      for (let i = 0; i < this.questionList.length; i++){
        total = total + this.questionList[i].time;
      }
    }
    return `${total} min`;
  }
}
