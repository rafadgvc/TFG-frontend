import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Question} from "../../../models/question";
import {Answer, AnswerList} from "../../../models/answer";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrl: './edit-question.component.css'
})
export class EditQuestionComponent {
  questionForm: FormGroup;
  question: Question = new Question (1, '¿Cuál de los siguientes no es un operador?', 2, 1, 'Test',true,
        new AnswerList([new Answer(3, 'Sentencia', 0),
          new Answer(4, 'Producto Cartesiano', 1),
          new Answer(5, 'Cura Natural', 0),
          new Answer(6, 'Detección', 0)]
        )
      )
  answers: FormArray;
  pairs: FormArray;
  types: string[] = ['Test', 'Desarrollo', 'Parametrizada']

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
  this.questionForm = this.formBuilder.group({
    title: [this.question.title, Validators.required],
    difficulty: [this.question.difficulty, [Validators.required, Validators.min(1), Validators.max(10)]],
    time: [this.question.time, [Validators.required, Validators.min(1)]],
    type: [this.question.type.toUpperCase(), Validators.required],
    answers: this.formBuilder.array([]),
    pairs: this.formBuilder.array([])
  });
  this.answers = this.questionForm.get('answers') as FormArray;
  this.pairs = this.questionForm.get('pairs') as FormArray;

  this.addAnswer();
  this.addAnswer();
  this.addPair();
}

  addAnswer() {
    this.answers.push(this.formBuilder.group({
      body: ['', Validators.required],
      points: [NaN, [Validators.required, Validators.min(-1), Validators.max(1)]]
    }));
  }

  addPair() {
    this.pairs.push(this.formBuilder.group({
      questionParameter: [''],
      answerParameter: ['']
    }));
  }

  removeAnswer(index: number) {
    this.answers.removeAt(index);
  }

  removePair(index: number) {
    this.pairs.removeAt(index);
  }

  onSubmit() {
    if (this.questionForm.valid) {
      const questionData = this.questionForm.value;
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

  get answersControls() {
    return (this.questionForm.get('answers') as FormArray).controls;
  }

  get pairsControls() {
    return (this.questionForm.get('pairs') as FormArray).controls;
  }

  submitForm(): void {
    if (this.questionForm.valid) {
      // TODO: Añadir creación de la pregunta
      this.router.navigate(['/home']);

    }
  }
}
