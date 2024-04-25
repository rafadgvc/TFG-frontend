import {Component, OnInit} from '@angular/core';
import {Question} from "../../../models/question";

import {QuestionService} from "../../../services/question.service";
import {ActivatedRoute} from "@angular/router";
import {Answer, AnswerList} from "../../../models/answer";
import {MatDialog} from "@angular/material/dialog";
import {SubjectModifyComponent} from "../../subject/subject-modify/subject-modify.component";
import {EditQuestionComponent} from "../edit-question/edit-question.component";
import {DeleteQuestionComponent} from "../delete-question/delete-question.component";

@Component({
    selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})

export class QuestionDetailComponent implements OnInit{
  // Question to be shown
  question?: Question;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit():void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.question = new Question (id, '¿Cuál de los siguientes no es un operador?', 2, 1, 'test',
        new AnswerList([new Answer(3, 'Sentencia', 0),
          new Answer(4, 'Producto Cartesiano', 1),
          new Answer(5, 'Cura Natural', 0),
          new Answer(6, 'Detección', 0)]
        )
      )
      //this.populateQuestion(id);
    });
  }

  populateQuestion(id: number){
    // Llamar al servicio para obtener la pregunta según el id
    this.questionService.getQuestion(id).subscribe(question => {
      this.question = question;
    });
  }

  editQuestion(): void {
    const dialogRef = this.dialog.open(EditQuestionComponent, {
      width: '800px',
      maxHeight: '700px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(this.question) {
        // this.populateQuestion(this.question?.id);
      }

    });
  }

  deleteQuestion(): void {
    const dialogRef = this.dialog.open(DeleteQuestionComponent, {
      width: '400px',
      data: {}
    });
  }

}
