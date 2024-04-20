import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AddQuestionComponent} from "./components/add-question/add-question.component";
import {ReactiveFormsModule} from "@angular/forms";
import {QuestionDetailComponent} from "./components/question-detail/question-detail.component";
import {UserSignupComponent} from "./components/user-signup/user-signup.component";

@NgModule({
  declarations: [
    AppComponent,
    AddQuestionComponent,
    QuestionDetailComponent,
    UserSignupComponent
    // Aquí puedes añadir otros componentes si es necesario
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),  MatFormFieldModule,
    MatFabButton,
    MatLabel,
    MatInput,
    MatButton,
    MatIcon,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // Configura las rutas principales
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
