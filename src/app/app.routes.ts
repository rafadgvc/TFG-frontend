import {Routes} from '@angular/router';
import {QuestionDetailComponent} from "./components/question-detail/question-detail.component";
import {AddQuestionComponent} from "./components/add-question/add-question.component";
import {UserSignupComponent} from "./components/user-signup/user-signup.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./auth.guard";
import {SubjectListComponent} from "./components/subject-list/subject-list.component";
import {SubjectDetailComponent} from "./components/subject-detail/subject-detail.component";
import {QuestionListComponent} from "./components/question-list/question-list.component";
import {NodeListComponent} from "./components/node-list/node-list.component";

export const routes: Routes = [
  {path: 'signup', component: UserSignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'question/:id', component: QuestionDetailComponent, canActivate: [AuthGuard]},
  {path: 'subject/:id', component: SubjectDetailComponent, canActivate: [AuthGuard]},
  {path: 'add-question', component: AddQuestionComponent, canActivate: [AuthGuard]},
  {path: 'question-list/:id', component: QuestionListComponent, canActivate: [AuthGuard]},
  {path: 'node-list/:id', component: NodeListComponent, canActivate: [AuthGuard]},
  {path: 'node/:id', component: SubjectDetailComponent, canActivate: [AuthGuard]},
  {path: 'home', component: SubjectListComponent, canActivate: [AuthGuard]}
];
