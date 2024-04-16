import {Routes} from '@angular/router';
import {QuestionDetailComponent} from "./question-detail/question-detail.component";
import {AddQuestionComponent} from "./add-question/add-question.component";

export const routes: Routes = [
  {path: 'question-detail/:id', component: QuestionDetailComponent},
  {path: 'add-question', component: AddQuestionComponent}
];
