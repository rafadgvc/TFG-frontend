import {Component, OnInit} from '@angular/core';
import {Question} from "../../../models/question";

import {QuestionService} from "../../../services/question.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Answer, AnswerList} from "../../../models/answer";
import {MatDialog} from "@angular/material/dialog";
import {SubjectModifyComponent} from "../../subject/subject-modify/subject-modify.component";
import {EditQuestionComponent} from "../edit-question/edit-question.component";
import {DeleteQuestionComponent} from "../delete-question/delete-question.component";
import {DisableQuestionComponent} from "../disable-question/disable-question.component";
import {QuestionParameter, QuestionParameterList} from "../../../models/question-parameter";

@Component({
    selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})

export class QuestionDetailComponent implements OnInit{
  // Question to be shown
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

  populateQuestion(id: number){
    // Llamar al servicio para obtener la pregunta según el id
    this.questionService.getQuestion(id).subscribe(question => {
      this.question = question;
      this.loading = false;
      console.log(this.question)
      if (this.question.question_parameters?.total !== undefined && this.question.question_parameters.total > 0){
        this.parameterNumber = this.question.question_parameters.items[this.question.question_parameters.total - 1].position;
      }
    });
  }

  editQuestion(): void {
    this.router.navigate(['/edit-question/' + this.question?.id]);
  }

  deleteQuestion(): void {
    const dialogRef = this.dialog.open(DeleteQuestionComponent, {
      width: '400px',
      data: {
        question: this.question
      }
    });
  }

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

  formatPoints(points: number): string{
    return ("" + points*100 + " %");
  }

}
