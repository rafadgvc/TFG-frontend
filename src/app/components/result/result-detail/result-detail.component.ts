import {Component, OnInit} from '@angular/core';
import {Exam} from "../../../models/exam";
import {QuestionService} from "../../../services/question.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Question, QuestionList} from "../../../models/question";
import {Answer, AnswerList} from "../../../models/answer";
import {Result} from "../../../models/result";
import {MatTableDataSource} from "@angular/material/table";
import {HierarchyNode, HierarchyNodeList} from "../../../models/hierarchy-node";

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
  selectedNode: string | null = null;
  dataSource: MatTableDataSource<Result> = new MatTableDataSource<Result>();
  nodeList: HierarchyNode[] = [];

  id: number = 1;
  displayedColumns: string[] = ['exam', 'taker', 'question', 'node', 'time', 'points'];

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
    const preheatedNodes: HierarchyNode[] = [
      new HierarchyNode(1, "Fundamentos de Bases de Datos", NaN),
      new HierarchyNode(2, "Conceptos Básicos", 1),
      new HierarchyNode(3, "Operadores SQL", 1),
      new HierarchyNode(4, "Álgebra Relacional", 1),
      new HierarchyNode(5, "Tabla", 2),
      new HierarchyNode(6, "Columna", 5),
      new HierarchyNode(7, "Fila", 5),
      new HierarchyNode(8, "Selección", 2),
      new HierarchyNode(9, "Proyección", 2),
    ];
    this.nodeList = preheatedNodes;

    const preheatedResponses: Question[][] = [
        [
            new Question(1, "¿Cuál es la capital de Francia?", 2, 38, "multiple_choice", new AnswerList([]), 1, new HierarchyNodeList([this.nodeList[4]])),
            new Question(2, "¿Cuántos lados tiene un cuadrado?", 1, 22, "true_false", new AnswerList([]), 1, new HierarchyNodeList([this.nodeList[3]])),
            new Question(3, "¿Qué año fue la Revolución Francesa?", 3, 42, "open_answer", new AnswerList([]), 0, new HierarchyNodeList([this.nodeList[3]])),
            new Question(4, "¿Cuál es el resultado de 2 + 2?", 1, 18, "open_answer", new AnswerList([]), 1, new HierarchyNodeList([this.nodeList[5]])),
            new Question(5, "¿Quién escribió 'Don Quijote de la Mancha'?", 2, 22, "multiple_choice", new AnswerList([]), 1, new HierarchyNodeList([this.nodeList[5]])),
            new Question(6, "¿Cuál es el símbolo químico del agua?", 2, 37, "multiple_choice", new AnswerList([]), 0, new HierarchyNodeList([this.nodeList[4]])),
            new Question(7, "¿Cuál es el planeta más grande del sistema solar?", 3, 38, "open_answer", new AnswerList([]), 1, new HierarchyNodeList([this.nodeList[3]])),
            new Question(8, "¿Cuál es el río más largo del mundo?", 2, 34, "true_false", new AnswerList([]), 0, new HierarchyNodeList([this.nodeList[3]])),
            new Question(9, "¿Quién pintó la Mona Lisa?", 3, 31, "open_answer", new AnswerList([]), 0, new HierarchyNodeList([this.nodeList[6]])),
        ],
        [
            new Question(1, "¿Cuál es la capital de Francia?", 2, 20, "multiple_choice", new AnswerList([]), 1, new HierarchyNodeList([this.nodeList[4]])),
            new Question(2, "¿Cuántos lados tiene un cuadrado?", 1, 10, "true_false", new AnswerList([]), 0, new HierarchyNodeList([this.nodeList[3]])),
            new Question(3, "¿Qué año fue la Revolución Francesa?", 3, 50, "open_answer", new AnswerList([]), 1, new HierarchyNodeList([this.nodeList[3]])),
            new Question(4, "¿Cuál es el resultado de 2 + 2?", 1, 15, "open_answer", new AnswerList([]), 1, new HierarchyNodeList([this.nodeList[5]])),
            new Question(5, "¿Quién escribió 'Don Quijote de la Mancha'?", 2, 15, "multiple_choice", new AnswerList([]), 1, new HierarchyNodeList([this.nodeList[5]])),
            new Question(6, "¿Cuál es el símbolo químico del agua?", 2, 34, "multiple_choice", new AnswerList([]), 0, new HierarchyNodeList([this.nodeList[4]])),
            new Question(7, "¿Cuál es el planeta más grande del sistema solar?", 3, 22, "open_answer", new AnswerList([]), 0, new HierarchyNodeList([this.nodeList[3]])),
            new Question(8, "¿Cuál es el río más largo del mundo?", 2, 19, "true_false", new AnswerList([]), 0, new HierarchyNodeList([this.nodeList[3]])),
            new Question(9, "¿Quién pintó la Mona Lisa?", 3, 34, "open_answer", new AnswerList([]), 1, new HierarchyNodeList([this.nodeList[6]])),
        ]
    ];

    const exam = new Exam(1, "Ordinaria 2016", 5, 120, new QuestionList(preheatedQuestions), 1);

    // Iterar sobre cada conjunto de respuestas precalentadas y crear un Result para cada una
    for (let i = 0; i < 10; i++) {
        const responses = preheatedResponses[i % 2];
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
        taker: this.selectedTaker,
        node: this.selectedNode
      });
    }
  }

  customFilter(data: Result, filter: string): boolean {
  const searchTerms = JSON.parse(filter);
  return <boolean>(
    (searchTerms.examId === null || data.exam?.id === searchTerms.examId) &&
    (searchTerms.taker === null || data.taker === searchTerms.taker) &&
    (searchTerms.node === null || data.question?.nodes?.items.some(node => node.name === searchTerms.node))
  );
}

  resetFilters() {
    this.selectedExamId = null;
    this.selectedTaker = null;
    this.applyFilter();
  }

  formatPoints(points: number): string{
    return ("" + points*100 + " %");
  }

  formatTime(time: number): string{
    return ("" + time + " min");
  }

  formatNodes(nodes: HierarchyNodeList): string{
    let res = "";
    res = res + nodes.items.at(0)?.name;
    for (let i = 1; i < nodes.total; i++){
      res = res + ", " + nodes.items.at(i)?.name;
    }
    return res;
  }

  calculateAveragePoints(filteredResults: Result[]): number {
    const totalPoints = filteredResults.reduce((acc, curr) => {
      if (curr.question?.points) {
        return acc + curr.question.points;
      } else {
        return acc;
      }
    }, 0);
    return filteredResults.length > 0 ? totalPoints / filteredResults.length : 0;
  }

  calculateTotalResults(filteredResults: Result[]): number {
    return filteredResults.length;
  }

  calculateAverageTime(filteredResults: Result[]): number {
    const totalTime = filteredResults.reduce((acc, curr) => {
      if (curr.question) {
        return acc + curr.question.time;
      } else {
        return acc;
      }
    }, 0);
    return filteredResults.length > 0 ? totalTime / filteredResults.length : 0;
  }



}
