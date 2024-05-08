import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Question, QuestionList} from "../../../models/question";
import {Answer, AnswerList} from "../../../models/answer";
import {Exam} from "../../../models/exam";

@Component({
  selector: 'app-edit-exam',
  templateUrl: './edit-exam.component.html',
  styleUrl: './edit-exam.component.css'
})
export class EditExamComponent {
  exam?: Exam;
  examForm: FormGroup;
  questions: FormArray;
  types: string[] = ['Test', 'Desarrollo', 'Parametrizada']

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    const preheatedQuestions: Question[] = [
      new Question(1, "¿Cuál es la capital de Francia?", 2, 30, "multiple_choice",true),
      new Question(2, "¿Cuántos lados tiene un cuadrado?", 1, 20, "true_false",true, new AnswerList([new Answer(1,'1', 0), new Answer(2, '2', 0), new Answer(3, '3', 0), new Answer(4, '4', 1)])),
      new Question(3, "¿Qué año fue la Revolución Francesa?", 3, 40, "open_answer",true),
      new Question(4, "¿Cuál es el resultado de 2 + 2?", 1, 15, "open_answer",true),
      new Question(5, "¿Quién escribió 'Don Quijote de la Mancha'?", 2, 25, "multiple_choice",true),
      new Question(6, "¿Cuál es el símbolo químico del agua?", 2, 30, "multiple_choice",true),
      new Question(7, "¿Cuál es el planeta más grande del sistema solar?", 3, 35, "open_answer",true),
      new Question(8, "¿Cuál es el río más largo del mundo?", 2, 30, "true_false",true),
      new Question(9, "¿Quién pintó la Mona Lisa?", 3, 40, "open_answer",true),
    ];
    this.exam = new Exam(1, "Ordinaria 2016", 5, 120, new QuestionList(preheatedQuestions), 1);
  this.examForm = this.formBuilder.group({
    title: [this.exam.title, Validators.required],
    difficulty: [this.exam.difficulty, [Validators.min(1), Validators.max(10)]],
    time: [this.exam.time, [Validators.min(1)]],
    questions: this.formBuilder.array([]),
    size:[this.exam.questions?.total, [Validators.required, Validators.min(1)]]
  });
  this.questions = this.examForm.get('questions') as FormArray;

  for (const question of this.exam?.questions?.items || []) {
    if (question instanceof Question) {
        this.questions.push(this.formBuilder.group({
            node: [''],
            difficulty: [question.difficulty, [Validators.min(1), Validators.max(10)]],
            time: [question.time, [Validators.min(1)]]
        }));
    }
  }
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
        true,
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
