import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AnswerList } from "../../models/answer";
import { Question } from "../../models/question";
import {Subject} from "../../models/subject";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {
  questionForm: FormGroup;
  answers: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddQuestionComponent>
  ) {
  this.questionForm = this.formBuilder.group({
    title: ['', Validators.required],
    difficulty: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
    time: ['', [Validators.required, Validators.min(1)]],
    type: ['', Validators.required],
    // TODO: Cambiar a un selector
    answers: this.formBuilder.array([], Validators.required)
  });
  this.answers = this.questionForm.get('answers') as FormArray;

  this.addAnswer();
  this.addAnswer();
}

  addAnswer() {
    this.answers.push(this.formBuilder.group({
      body: ['', Validators.required],
      points: [NaN, [Validators.required, Validators.min(-1), Validators.max(1)]]
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
