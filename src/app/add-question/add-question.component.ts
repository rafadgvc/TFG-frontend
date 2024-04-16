import { Component } from '@angular/core';
import {Question} from "../models/question";
import {QuestionService} from "../services/question.service";
import {ActivatedRoute} from "@angular/router";
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatButton, MatFabButton} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})

export class AddQuestionComponent {
  // Question to be added
  question?: Question;
  questionForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService
  ) {
    this.questionForm = this.formBuilder.group({
      body: ['', Validators.required],
      answers: this.formBuilder.array([
        this.createAnswerFormGroup(),
        this.createAnswerFormGroup()
      ])
    });
  }

  createAnswerFormGroup(): FormGroup{
    return this.formBuilder.group(
      {
        text:['', Validators.required],
        score:[0, [Validators.required, Validators.min(-1), Validators.max(1)]]
      }
    )
  }

  getAnswerControls(): FormControl[] {
  const answerControls = (this.questionForm.get('answers') as FormArray).controls;
  return answerControls.map(control => control as FormControl);
}

  addAnswer(){
    this.questionForm.get('answers')?.value.push(this.createAnswerFormGroup());
  }

  removeAnswer(index: number){
    this.questionForm.get('answers')?.value.removeAt(index);
  }
}
