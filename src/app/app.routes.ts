import {RouterModule, Routes} from '@angular/router';
import {QuestionDetailComponent} from "./question-detail/question-detail.component";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from "./app.component";

export const routes: Routes = [
  {path: 'question-detail/:id', component: QuestionDetailComponent}
];
