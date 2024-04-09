import {Component, OnInit} from '@angular/core';
import {Question} from "../models/question";
import {QuestionService} from "../services/question.service";

@Component({
    selector: 'app-question-detail',
  standalone: true,
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})

export class QuestionDetailComponent implements OnInit{
  // Question to be shown
  question?: Question;

  constructor(private questionService: QuestionService) {}

  ngOnInit():void{
    this.questionService.getQuestion().subscribe(question =>{
      this.question = question;
    });

  }

}
