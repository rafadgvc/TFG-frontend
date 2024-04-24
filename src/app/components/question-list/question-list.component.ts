import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Question} from "../../models/question";
import {QuestionService} from "../../services/question.service";
import {AddQuestionComponent} from "../add-question/add-question.component";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css'
})
export class QuestionListComponent implements OnInit{
  id?: number;
  questionList: Question[] = [];
  displayedColumns: string[] = ['title', 'difficulty', 'time', 'type', 'actions'];



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
        this.loadQuestionSubjects(this.id);
      }
    });
  }

  loadQuestionSubjects(id: number): void {
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
  }

  viewSubject(subjectId: number): void {
    this.router.navigate(['/subject/' + subjectId]);
  }

  viewQuestion(questionId: number): void {
    this.router.navigate(['/question/' + questionId]);
  }

  openAddQuestionModal(): void {
    // TODO: Cambiar a añadir pregunta
    const dialogRef = this.dialog.open(AddQuestionComponent, {
      width: '800px', // Ancho del modal
      maxHeight: '700px',
      data: {} // Puedes pasar datos al modal si es necesario

    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadQuestionSubjects(3);

    });
  }

}
