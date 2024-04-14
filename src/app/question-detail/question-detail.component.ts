import {Component, OnInit} from '@angular/core';
import {Question} from "../models/question";
import {QuestionService} from "../services/question.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-question-detail',
  standalone: true,
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})

export class QuestionDetailComponent implements OnInit{
  // Question to be shown
  question?: Question;

  constructor(private questionService: QuestionService, private route: ActivatedRoute) {}

  ngOnInit():void {
    this.route.params.subscribe(params => {
      const id = +params['id']; // '+' convierte el string a número
      // Llamar al servicio para obtener la pregunta según el id
      this.questionService.getQuestion(id).subscribe(question => {
        this.question = question;
      });
    });
  }

}
