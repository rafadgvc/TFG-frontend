import { NgModule } from '@angular/core';
import {Tree, TreeModule} from 'primeng/tree';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {AddQuestionComponent} from "./components/question/add-question/add-question.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {QuestionDetailComponent} from "./components/question/question-detail/question-detail.component";
import {UserSignupComponent} from "./components/user-signup/user-signup.component";
import {LoginComponent} from "./components/login/login.component";
import {SubjectListComponent} from "./components/subject/subject-list/subject-list.component";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {AddSubjectComponent} from "./components/subject/add-subject/add-subject.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {SubjectDetailComponent} from "./components/subject/subject-detail/subject-detail.component";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {SubjectDeleteComponent} from "./components/subject/subject-delete/subject-delete.component";
import {SubjectModifyComponent} from "./components/subject/subject-modify/subject-modify.component";
import {QuestionListComponent} from "./components/question/question-list/question-list.component";
import {EditQuestionComponent} from "./components/question/edit-question/edit-question.component";
import {DeleteQuestionComponent} from "./components/question/delete-question/delete-question.component";
import {NodeListComponent} from "./components/node/node-list/node-list.component";
import {AddNodeComponent} from "./components/node/add-node/add-node.component";
import {MatOption, MatSelect} from "@angular/material/select";
import {EditNodeComponent} from "./components/node/edit-node/edit-node.component";
import {NodeDetailComponent} from "./components/node/node-detail/node-detail.component";
import {DeleteNodeComponent} from "./components/node/delete-node/delete-node.component";
import {ExamListComponent} from "./components/exam/exam-list/exam-list.component";
import {ExamDetailComponent} from "./components/exam/exam-detail/exam-detail.component";
import {DeleteExamComponent} from "./components/exam/delete-exam/delete-exam.component";
import {AddExamComponent} from "./components/exam/add-exam/add-exam.component";
import {EditExamComponent} from "./components/exam/edit-exam/edit-exam.component";
import {ExportExamComponent} from "./components/exam/export-exam/export-exam.component";
import {ImportResultComponent} from "./components/result/import-result/import-result.component";
import {DeleteResultComponent} from "./components/result/delete-result/delete-result.component";
import {ResultDetailComponent} from "./components/result/result-detail/result-detail.component";
import {ImportQuestionsComponent} from "./components/question/import-questions/import-questions.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatTooltip} from "@angular/material/tooltip";
import { MatIconModule } from '@angular/material/icon'; // Importa MatIconModule para los iconos
import {MatTree, MatTreeModule} from '@angular/material/tree';
import {MatProgressBar} from "@angular/material/progress-bar";
import {DisableQuestionComponent} from "./components/question/disable-question/disable-question.component";

@NgModule({
  declarations: [
    AppComponent,
    AddQuestionComponent,
    QuestionDetailComponent,
    UserSignupComponent,
    LoginComponent,
    SubjectListComponent,
    AddSubjectComponent,
    SubjectDetailComponent,
    SubjectDeleteComponent,
    SubjectModifyComponent,
    QuestionListComponent,
    EditQuestionComponent,
    DeleteQuestionComponent,
    NodeListComponent,
    AddNodeComponent,
    NodeDetailComponent,
    EditNodeComponent,
    DeleteNodeComponent,
    ExamListComponent,
    ExamDetailComponent,
    DeleteExamComponent,
    AddExamComponent,
    EditExamComponent,
    ExportExamComponent,
    ImportResultComponent,
    DeleteResultComponent,
    ResultDetailComponent,
    ImportQuestionsComponent,
    DisableQuestionComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routes), MatFormFieldModule,
        MatFabButton,
        MatLabel,
        MatInput,
        MatIconModule,
        MatTreeModule,
        MatButton,
        MatIconModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatCard,
        MatCardTitle,
        MatCardContent,
        MatCardHeader,
        BrowserAnimationsModule, MatTable, MatColumnDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatHeaderRowDef, MatRowDef, MatCellDef, MatHeaderCellDef, MatIconButton, MatCardActions, FormsModule, MatSelect, MatOption, MatPaginator, MatTooltip,
        TreeModule, MatProgressBar
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
