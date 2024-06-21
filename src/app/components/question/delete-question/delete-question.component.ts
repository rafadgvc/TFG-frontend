import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {SnackbarService} from "../../../services/snackbar.service";
import {QuestionService} from "../../../services/question.service";
import {Question} from "../../../models/question";

@Component({
  selector: 'app-delete-question',
  templateUrl: './delete-question.component.html',
  styleUrl: './delete-question.component.css'
})
export class DeleteQuestionComponent {
  question: Question;

  constructor(
    public dialogRef: MatDialogRef<DeleteQuestionComponent>,
    private questionService: QuestionService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbarService: SnackbarService
  ){
    this.question = this.data.question;
  }

  /* Deletes the Question */
  deleteQuestion(): void {
      this.questionService.deleteQuestion(this.question).subscribe(
        () => {
          this.snackbarService.showSuccess('Pregunta eliminada correctamente.');
          this.dialogRef.close();
          this.router.navigate(['/home']);
        }
      );

  }



}
