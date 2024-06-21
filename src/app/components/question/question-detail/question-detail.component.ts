import {Component, OnInit} from '@angular/core';
import {Question} from "../../../models/question";
import {QuestionService} from "../../../services/question.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DeleteQuestionComponent} from "../delete-question/delete-question.component";
import {DisableQuestionComponent} from "../disable-question/disable-question.component";

@Component({
    selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})

export class QuestionDetailComponent implements OnInit{
  question?: Question;
  loading: boolean = true;
  parameterNumber: number = 0;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit():void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.populateQuestion(id);
    });
  }

  /* Gets the Question */
  populateQuestion(id: number){
    this.questionService.getQuestion(id).subscribe(question => {
      this.question = question;
      this.loading = false;
      if (this.question.question_parameters?.total !== undefined && this.question.question_parameters.total > 0){
        this.parameterNumber = this.question.question_parameters.items[this.question.question_parameters.total - 1].position;
      }
    });
  }

  /* Opens a modal to edit the Question */
  editQuestion(): void {
    this.router.navigate(['/edit-question/' + this.question?.id]);
  }

  /* Opens a modal to delete the Question */
  deleteQuestion(): void {
    const dialogRef = this.dialog.open(DeleteQuestionComponent, {
      width: '400px',
      data: {
        question: this.question
      }
    });
  }

  /* Opens a modal to disable the Question */
  disableQuestion(): void {
    const dialogRef = this.dialog.open(DisableQuestionComponent, {
      width: '400px',
      data: {
        question: this.question
      }
    });
    dialogRef.afterClosed().subscribe( result => {
      if (this.question?.id) {
        this.populateQuestion(this.question?.id);
      }
    });
  }

  /* Formats the points to be seen as a percentage */
  formatPoints(points: number): string{
    return ("" + points + " %");
  }

}
