import {Component, OnInit} from '@angular/core';
import {Question} from "../../../models/question";

import {QuestionService} from "../../../services/question.service";
import {ActivatedRoute, Router} from "@angular/router";
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
    public dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit():void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if(id % 2 == 0) {
        this.question = new Question(id, '¿Cuál de los siguientes no es un operador?', 2, 1, 'test',
          new AnswerList([new Answer(3, 'Sentencia', 0),
            new Answer(4, 'Producto Cartesiano', 1),
            new Answer(5, 'Cura Natural', 0),
            new Answer(6, 'Detección', 0)]
          )
        )
      } else{
        this.question = new Question (id, '¿Qué operadores funcionan únicamente sobre una tabla?', 2, 1, 'desarrollo',
        new AnswerList([new Answer(3, 'Selección', 1),
          new Answer(4, 'Proyección', 1)]
        )
      )
      }

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
    this.router.navigate(['/edit-question/' + this.question?.id]);
  }

  deleteQuestion(): void {
    const dialogRef = this.dialog.open(DeleteQuestionComponent, {
      width: '400px',
      data: {}
    });
  }

  formatPoints(points: number): string{
    return ("" + points*100 + " %");
  }

}
