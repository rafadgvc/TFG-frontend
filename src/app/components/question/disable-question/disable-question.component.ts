import {Component, Inject} from '@angular/core';
import {Question} from "../../../models/question";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {QuestionService} from "../../../services/question.service";
import {Router} from "@angular/router";
import {SnackbarService} from "../../../services/snackbar.service";

@Component({
  selector: 'app-disable-question',
  templateUrl: './disable-question.component.html',
  styleUrl: './disable-question.component.css'
})
export class DisableQuestionComponent {

  question: Question;

  constructor(
    public dialogRef: MatDialogRef<DisableQuestionComponent>,
    private questionService: QuestionService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbarService: SnackbarService
  ){
    this.question = this.data.question;
  }

  /* Disables the Question */
  disableQuestion(): void {
      this.questionService.disableQuestion(this.question).subscribe(
        () => {
          this.snackbarService.showSuccess('Pregunta desactivada correctamente.');
          this.dialogRef.close();
        }
      );
  }
}
