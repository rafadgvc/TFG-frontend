import {Component, OnInit} from '@angular/core';
import {Exam} from "../../../models/exam";
import {QuestionService} from "../../../services/question.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Question, QuestionList} from "../../../models/question";
import {Answer, AnswerList} from "../../../models/answer";
import {Result} from "../../../models/result";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-result-detail',
  templateUrl: './result-detail.component.html',
  styleUrl: './result-detail.component.css'
})
export class ResultDetailComponent{
  // Results to be shown
  results: Result[] = [];
  exams: Exam[] = [];
  takers: number[] = [];
  selectedExamId: number | null = null;
  selectedTaker: number | null = null;
  dataSource: MatTableDataSource<Result> = new MatTableDataSource<Result>();

  id: number = 1;
  displayedColumns: string[] = ['exam', 'taker', 'question', 'time', 'points'];

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];

      this.populateResults(this.id);
      this.loadExams();
      this.loadTakers();
      if (this.dataSource != undefined)
        this.dataSource.filterPredicate = this.customFilter;
    });
  }

  populateResults(examId: number){
    // TODO: Llamar al servicio para obtener los resultados según el id
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

    const preheatedResponses: Question[][] = [
        [
            new Question(1, "¿Cuál es la capital de Francia?", 2, 38, "multiple_choice", new AnswerList([]), 1),
            new Question(2, "¿Cuántos lados tiene un cuadrado?", 1, 22, "true_false", new AnswerList([]), 1),
            new Question(3, "¿Qué año fue la Revolución Francesa?", 3, 42, "open_answer", new AnswerList([]), 0),
            new Question(4, "¿Cuál es el resultado de 2 + 2?", 1, 18, "open_answer", new AnswerList([]), 1),
            new Question(5, "¿Quién escribió 'Don Quijote de la Mancha'?", 2, 22, "multiple_choice", new AnswerList([]), 1),
            new Question(6, "¿Cuál es el símbolo químico del agua?", 2, 37, "multiple_choice", new AnswerList([]), 0),
            new Question(7, "¿Cuál es el planeta más grande del sistema solar?", 3, 38, "open_answer", new AnswerList([]), 1),
            new Question(8, "¿Cuál es el río más largo del mundo?", 2, 34, "true_false", new AnswerList([]), 0),
            new Question(9, "¿Quién pintó la Mona Lisa?", 3, 31, "open_answer", new AnswerList([]), 0),
        ],
        [
            new Question(1, "¿Cuál es la capital de Francia?", 2, 20, "multiple_choice", new AnswerList([]), 1),
            new Question(2, "¿Cuántos lados tiene un cuadrado?", 1, 10, "true_false", new AnswerList([]), 0),
            new Question(3, "¿Qué año fue la Revolución Francesa?", 3, 50, "open_answer", new AnswerList([]), 1),
            new Question(4, "¿Cuál es el resultado de 2 + 2?", 1, 15, "open_answer", new AnswerList([]), 1),
            new Question(5, "¿Quién escribió 'Don Quijote de la Mancha'?", 2, 15, "multiple_choice", new AnswerList([]), 1),
            new Question(6, "¿Cuál es el símbolo químico del agua?", 2, 34, "multiple_choice", new AnswerList([]), 0),
            new Question(7, "¿Cuál es el planeta más grande del sistema solar?", 3, 22, "open_answer", new AnswerList([]), 0),
            new Question(8, "¿Cuál es el río más largo del mundo?", 2, 19, "true_false", new AnswerList([]), 0),
            new Question(9, "¿Quién pintó la Mona Lisa?", 3, 34, "open_answer", new AnswerList([]), 1),
        ]
    ];

    const exam = new Exam(1, "Ordinaria 2016", 5, 120, new QuestionList(preheatedQuestions), 1);

    // Iterar sobre cada conjunto de respuestas precalentadas y crear un Result para cada una
    for (let i = 0; i < preheatedResponses.length; i++) {
        const responses = preheatedResponses[i];
        for (let j = 0; j < responses.length; j++) {
            const response = responses[j];
            this.results.push(new Result(j + 1, i + 1, exam, response));
        }
    }
    this.dataSource = new MatTableDataSource(this.results);
  }

  loadExams() {
    // TODO: Llamar al servicio para obtener los exámenes según el id
    const preheatedExams: Exam[] = [
      new Exam(1, "Ordinaria 2016", 5, 120, new QuestionList([]), 1)
    ];
    this.exams = preheatedExams;
  }

  loadTakers() {
    // TODO: Llamar al servicio para obtener los alumnos según el id
    const preheatedTakers: number[] = [1, 2,3,4,5,6,7,8,9,10];
    this.takers = preheatedTakers;
  }

  applyFilter() {
    if (this.dataSource) {
      this.dataSource.filter = JSON.stringify({
        examId: this.selectedExamId,
        taker: this.selectedTaker
      });
    }
  }

  customFilter(data: Result, filter: string): boolean {
  const searchTerms = JSON.parse(filter);
  return (
    (searchTerms.examId === null || data.exam?.id === searchTerms.examId) &&
    (searchTerms.taker === null || data.taker === searchTerms.taker)
  );
}

  resetFilters() {
    this.selectedExamId = null;
    this.selectedTaker = null;
    this.applyFilter();
  }


}
