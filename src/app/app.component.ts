import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {QuestionDetailComponent} from "./question-detail/question-detail.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuestionDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'questions-frontend';
}
