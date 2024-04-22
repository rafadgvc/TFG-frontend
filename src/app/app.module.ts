import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {AddQuestionComponent} from "./components/add-question/add-question.component";
import {ReactiveFormsModule} from "@angular/forms";
import {QuestionDetailComponent} from "./components/question-detail/question-detail.component";
import {UserSignupComponent} from "./components/user-signup/user-signup.component";
import {LoginComponent} from "./components/login/login.component";
import {SubjectListComponent} from "./components/subject-list/subject-list.component";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";

@NgModule({
  declarations: [
    AppComponent,
    AddQuestionComponent,
    QuestionDetailComponent,
    UserSignupComponent,
    LoginComponent,
    SubjectListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes), MatFormFieldModule,
    MatFabButton,
    MatLabel,
    MatInput,
    MatButton,
    MatIconModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, MatTable, MatColumnDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatHeaderRowDef, MatRowDef, MatCellDef, MatHeaderCellDef, MatIconButton,
    // Configura las rutas principales
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
