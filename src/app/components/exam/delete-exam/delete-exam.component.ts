import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {Exam} from "../../../models/exam";
import {ExamService} from "../../../services/exam_service";
import {SnackbarService} from "../../../services/snackbar.service";

@Component({
  selector: 'app-delete-exam',
  templateUrl: './delete-exam.component.html',
  styleUrl: './delete-exam.component.css'
})
export class DeleteExamComponent {
  exam: Exam;
  constructor(
    public dialogRef: MatDialogRef<DeleteExamComponent>,
    private examService: ExamService,
    private snackbarService: SnackbarService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){
    this.exam = this.data.exam;
  }

  /* Deletes the Exam */
  deleteExam(): void {
    this.examService.deleteExam(this.exam.id).subscribe(
        () => {
          this.snackbarService.showSuccess('Resultados eliminados correctamente.');
          this.dialogRef.close();
          this.router.navigate(['/exam-list/'+ this.exam.subject_id]);
        }
      );
  }
}
