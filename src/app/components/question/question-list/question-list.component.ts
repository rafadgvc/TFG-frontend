import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Question } from "../../../models/question";
import { QuestionService } from "../../../services/question.service";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit{
  loading: boolean = true;
  id: number = 0;
  questionList: Question[] = [];
  displayedColumns: string[] = ['title', 'difficulty', 'time', 'type', 'actions'];
  dataSource = new MatTableDataSource<Question>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id != null) {
        this.loadQuestionSubjects(this.id);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadQuestionSubjects(id: number): void {
    this.loading = true;
    this.questionService.getSubjectQuestions(id).subscribe(
      questionList => {
        this.questionList = questionList.items;
        this.dataSource = new MatTableDataSource(this.questionList);
        this.loading = false;
        this.dataSource.paginator = this.paginator;
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
    this.router.navigate(['/add-question/' + this.id]);
  }
}
