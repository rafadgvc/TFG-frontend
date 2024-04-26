import {Component, OnInit} from '@angular/core';
import {Question, QuestionList} from "../../../models/question";
import {QuestionService} from "../../../services/question.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Answer, AnswerList} from "../../../models/answer";
import {EditQuestionComponent} from "../../question/edit-question/edit-question.component";
import {DeleteQuestionComponent} from "../../question/delete-question/delete-question.component";
import {Exam} from "../../../models/exam";
import {DeleteExamComponent} from "../delete-exam/delete-exam.component";
import {ExportExamComponent} from "../export-exam/export-exam.component";

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrl: './exam-detail.component.css'
})
export class ExamDetailComponent implements OnInit{

  // Question to be shown
  exam?: Exam;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit():void {
    this.route.params.subscribe(params => {
      const id = +params['id'];

      this.populateExam(id);
    });
  }

  populateExam(id: number){
    // TODO: Llamar al servicio para obtener la pregunta según el id
    const preheatedQuestions: Question[] = [
        new Question(1, "¿Cuál es la capital de Francia?", 2, 30, "multiple_choice"),
        new Question(2, "¿Cuántos lados tiene un cuadrado?", 1, 20, "true_false", new AnswerList([new Answer(1,'1', 0), new Answer(2, '2', 0), new Answer(3, '3', 0), new Answer(4, '4', 1)])),
        new Question(3, "¿Qué año fue la Revolución Francesa?", 3, 40, "open_answer"),
        new Question(4, "¿Cuál es el resultado de 2 + 2?", 1, 15, "open_answer"),
        new Question(5, "¿Quién escribió 'Don Quijote de la Mancha'?", 2, 25, "multiple_choice"),
        new Question(6, "¿Cuál es el símbolo químico del agua?", 2, 30, "multiple_choice"),
        new Question(7, "¿Cuál es el planeta más grande del sistema solar?", 3, 35, "open_answer"),
        new Question(8, "¿Cuál es el río más largo del mundo?", 2, 30, "true_false"),
        new Question(9, "¿Quién pintó la Mona Lisa?", 3, 40, "open_answer"),
      ];
      this.exam = new Exam(1, "Ordinaria 2016", 5, 120, new QuestionList(preheatedQuestions), 1);
  }

  editExam(): void {
     this.router.navigate(['/edit-exam/' + this.exam?.id]);
  }

  exportExam(): void {
    const dialogRef = this.dialog.open(ExportExamComponent, {
      width: '400px',
      data: {exam: this.exam}
    });
  }

  deleteExam(): void {
    const dialogRef = this.dialog.open(DeleteExamComponent, {
      width: '400px',
      data: {}
    });
  }
}
