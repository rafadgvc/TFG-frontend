import {Routes} from '@angular/router';
import {QuestionDetailComponent} from "./components/question/question-detail/question-detail.component";
import {AddQuestionComponent} from "./components/question/add-question/add-question.component";
import {UserSignupComponent} from "./components/user-signup/user-signup.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./auth.guard";
import {SubjectListComponent} from "./components/subject/subject-list/subject-list.component";
import {SubjectDetailComponent} from "./components/subject/subject-detail/subject-detail.component";
import {QuestionListComponent} from "./components/question/question-list/question-list.component";
import {NodeListComponent} from "./components/node/node-list/node-list.component";
import {NodeDetailComponent} from "./components/node/node-detail/node-detail.component";
import {ExamListComponent} from "./components/exam/exam-list/exam-list.component";
import {ExamDetailComponent} from "./components/exam/exam-detail/exam-detail.component";
import {EditQuestionComponent} from "./components/question/edit-question/edit-question.component";
import {AddExamComponent} from "./components/exam/add-exam/add-exam.component";

export const routes: Routes = [
  {path: 'signup', component: UserSignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'question/:id', component: QuestionDetailComponent, canActivate: [AuthGuard]},
  {path: 'subject/:id', component: SubjectDetailComponent, canActivate: [AuthGuard]},
  {path: 'add-question', component: AddQuestionComponent, canActivate: [AuthGuard]},
  {path: 'edit-question/:id', component: EditQuestionComponent, canActivate: [AuthGuard]},
  {path: 'question-list/:id', component: QuestionListComponent, canActivate: [AuthGuard]},
  {path: 'node-list/:id', component: NodeListComponent, canActivate: [AuthGuard]},
  {path: 'node/:id', component: NodeDetailComponent, canActivate: [AuthGuard]},
  {path: 'exam-list/:id', component: ExamListComponent, canActivate: [AuthGuard]},
  {path: 'exam/:id', component: ExamDetailComponent, canActivate: [AuthGuard]},
  {path: 'add-exam/:id', component: AddExamComponent, canActivate: [AuthGuard]},
  {path: 'home', component: SubjectListComponent, canActivate: [AuthGuard]}

];
