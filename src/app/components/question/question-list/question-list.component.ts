import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Question } from "../../../models/question";
import { QuestionService } from "../../../services/question.service";
import {ImportResultComponent} from "../../result/import-result/import-result.component";
import {ImportQuestionComponent} from "../import-question/import-question.component";

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

  importQuestions(): void {
    const dialogRef = this.dialog.open(ImportQuestionComponent, {
      width: '600px',
      data: {
        subject_id: this.id
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
