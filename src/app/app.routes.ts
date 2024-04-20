import {Routes} from '@angular/router';
import {QuestionDetailComponent} from "./components/question-detail/question-detail.component";
import {AddQuestionComponent} from "./components/add-question/add-question.component";
import {UserSignupComponent} from "./components/user-signup/user-signup.component";

export const routes: Routes = [
  {path: 'signup', component: UserSignupComponent},
  {path: 'question-detail/:id', component: QuestionDetailComponent},
  {path: 'add-question', component: AddQuestionComponent}
];
