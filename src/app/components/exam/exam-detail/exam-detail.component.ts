import {Component, OnInit} from '@angular/core';
import {Question, QuestionList} from "../../../models/question";
import {QuestionService} from "../../../services/question.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Answer, AnswerList} from "../../../models/answer";
import {EditQuestionComponent} from "../../question/edit-question/edit-question.component";
import {DeleteQuestionComponent} from "../../question/delete-question/delete-question.component";
import {Exam} from "../../../models/exam";

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
    public dialog: MatDialog
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
        new Question(2, "¿Cuántos lados tiene un cuadrado?", 1, 20, "true_false"),
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
    const dialogRef = this.dialog.open(EditQuestionComponent, {
      width: '800px',
      maxHeight: '700px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(this.exam) {
        // this.populateQuestion(this.question?.id);
      }

    });
  }

  deleteExam(): void {
    const dialogRef = this.dialog.open(DeleteQuestionComponent, {
      width: '400px',
      data: {}
    });
  }
}
