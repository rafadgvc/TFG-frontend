import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Question} from "../../../models/question";
import {Answer, AnswerList} from "../../../models/answer";

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrl: './edit-question.component.css'
})
export class EditQuestionComponent {
  questionForm: FormGroup;
  question: Question = new Question (1, '¿Cuál de los siguientes no es un operador?', 2, 1, 'test',
        new AnswerList([new Answer(3, 'Sentencia', 0),
          new Answer(4, 'Producto Cartesiano', 1),
          new Answer(5, 'Cura Natural', 0),
          new Answer(6, 'Detección', 0)]
        )
      )
  answers: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditQuestionComponent>
  ) {
  this.questionForm = this.formBuilder.group({
    title: [this.question.title, Validators.required],
    difficulty: [this.question.difficulty, [Validators.required, Validators.min(1), Validators.max(10)]],
    time: [this.question.time, [Validators.required, Validators.min(1)]],
    type: [this.question.type, Validators.required],
    answers: this.formBuilder.array([], Validators.required)
  });
  this.answers = this.questionForm.get('answers') as FormArray;
}

  addAnswer() {
    this.answers.push(this.formBuilder.group({
      body: ['', Validators.required],
      points: ['', [Validators.required, Validators.min(-1), Validators.max(1)]]
    }));
  }

  removeAnswer(index: number) {
    this.answers.removeAt(index);
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

  submitForm(): void {
    if (this.questionForm.valid) {
      // TODO: Añadir creación de la pregunta
      this.dialogRef.close();

    }
  }
}
