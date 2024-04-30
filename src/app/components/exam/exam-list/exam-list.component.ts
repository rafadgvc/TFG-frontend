import {Component, OnInit} from '@angular/core';
import {Question, QuestionList} from "../../../models/question";
import {QuestionService} from "../../../services/question.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AddQuestionComponent} from "../../question/add-question/add-question.component";
import {Exam} from "../../../models/exam";

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrl: './exam-list.component.css'
})
export class ExamListComponent implements OnInit{
  id: number = 0;
  questionList: Question[] = [];
  examList: Exam[] = [];
  displayedColumns: string[] = ['title', 'difficulty', 'time', 'questions', 'actions'];



  constructor(
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      // Llamar al servicio para obtener la pregunta según el id
      if (this.id != null) {
        this.loadSubjectExams(this.id);
      }
    });
  }

  loadSubjectExams(id: number): void {
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
    this.questionList = preheatedQuestions;
    const preheatedExams: Exam[] = [
      new Exam(1, "Ordinaria 2016", 5, 120, new QuestionList(this.questionList), 1),
      new Exam(2, "Extraordinaria 2016", 2, 150,new QuestionList(this.questionList), 1),
      new Exam(3, "Parcial 2017", 3, 60, new QuestionList(this.questionList), 1),
      new Exam(5, "Ordinaria 2017", 8, 120, new QuestionList(this.questionList), 1),
      new Exam(7, "Extraordinaria 2017", 4, 150, new QuestionList(this.questionList), 1),
    ];
    this.examList = preheatedExams;
  }

  viewExam(examId: number): void {
    this.router.navigate(['/exam/' + examId]);
  }

  addExam(subjectId: number): void {
    // TODO: Cambiar a añadir examen
    this.router.navigate(['/add-exam/' + subjectId]);
  }
}
