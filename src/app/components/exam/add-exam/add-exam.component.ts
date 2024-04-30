import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Question} from "../../../models/question";
import {AnswerList} from "../../../models/answer";
import {HierarchyNode} from "../../../models/hierarchy-node";

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrl: './add-exam.component.css'
})
export class AddExamComponent {
  examForm: FormGroup;
  questions: FormArray;
  types: string[] = ['Test', 'Desarrollo', 'Ninguno']
  nodeList: HierarchyNode[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    const preheatedNodes: HierarchyNode[] = [
      new HierarchyNode(1, "Fundamentos de Bases de Datos", NaN),
      new HierarchyNode(2, "Conceptos Básicos", 1),
      new HierarchyNode(3, "Operadores SQL", 1),
      new HierarchyNode(4, "Álgebra Relacional", 1),
      new HierarchyNode(5, "Tabla", 2),
      new HierarchyNode(6, "Columna", 5),
      new HierarchyNode(7, "Fila", 5),
      new HierarchyNode(8, "Selección", 2),
      new HierarchyNode(9, "Proyección", 2),
    ];
    this.nodeList = preheatedNodes;
  this.examForm = this.formBuilder.group({
    title: ['', Validators.required],
    difficulty: ['', [Validators.min(1), Validators.max(10)]],
    time: ['', [Validators.min(1)]],
    questions: this.formBuilder.array([]),
    size:['', [Validators.required, Validators.min(1)]]
  });
  this.questions = this.examForm.get('questions') as FormArray;

  this.addQuestion();
}

  addQuestion() {
    this.questions.push(this.formBuilder.group({
      node: [''],
      difficulty: ['', [Validators.min(1), Validators.max(10)]],
      time: ['', [Validators.min(1)]],
      type: ['']
    }));
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
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
        new AnswerList(questionData.answers)
      );
      // Now you can use 'question' object to save or do whatever you want
      console.log(question);
    } else {
      console.log('Invalid form');
    }
  }

  get questionsControls() {
    return (this.examForm.get('questions') as FormArray).controls;
  }

  submitForm(): void {
    if (this.examForm.valid) {
      // TODO: Añadir creación del examen
      this.router.navigate(['/home']);

    }
  }
}
