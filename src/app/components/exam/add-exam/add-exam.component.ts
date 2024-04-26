import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Question} from "../../../models/question";
import {AnswerList} from "../../../models/answer";

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrl: './add-exam.component.css'
})
export class AddExamComponent {
  examForm: FormGroup;
  questions: FormArray;
  types: string[] = ['Test', 'Desarrollo', 'Parametrizada']

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
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
      time: ['', [Validators.min(1)]]
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
