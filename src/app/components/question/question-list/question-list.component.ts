import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Question} from "../../../models/question";
import {QuestionService} from "../../../services/question.service";
import {AddQuestionComponent} from "../add-question/add-question.component";
import {AddSubjectComponent} from "../../subject/add-subject/add-subject.component";
import {ImportQuestionsComponent} from "../import-questions/import-questions.component";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css'
})
export class QuestionListComponent implements OnInit{
  loading: boolean = true;
  id: number = 0;
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
    this.loading = true;
    this.questionService.getSubjectQuestions(id).subscribe(
      questionList => {
        this.questionList = questionList.items;
        this.loading = false;
      },
    );
  }

  viewSubject(subjectId: number): void {
    this.router.navigate(['/subject/' + subjectId]);
  }

  viewQuestion(questionId: number): void {
    this.router.navigate(['/question/' + questionId]);
  }

  addQuestion(): void {
    this.router.navigate(['/add-question']);
  }

  openAddQuestionsModal(): void {
    const dialogRef = this.dialog.open(ImportQuestionsComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadQuestionSubjects(this.id);
    });
  }

}
