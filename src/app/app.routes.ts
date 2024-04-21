import {Routes} from '@angular/router';
import {QuestionDetailComponent} from "./components/question-detail/question-detail.component";
import {AddQuestionComponent} from "./components/add-question/add-question.component";
import {UserSignupComponent} from "./components/user-signup/user-signup.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./auth.guard";

export const routes: Routes = [
  {path: 'signup', component: UserSignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'question-detail/:id', component: QuestionDetailComponent, canActivate: [AuthGuard]},
  {path: 'add-question', component: AddQuestionComponent, canActivate: [AuthGuard]}
];
