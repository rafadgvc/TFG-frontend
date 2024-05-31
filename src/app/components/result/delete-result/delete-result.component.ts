import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SubjectService} from "../../../services/subject.service";
import {Router} from "@angular/router";
import {Exam} from "../../../models/exam";
import {ResultService} from "../../../services/result.service";
import {SnackbarService} from "../../../services/snackbar.service";

@Component({
  selector: 'app-delete-result',
  templateUrl: './delete-result.component.html',
  styleUrl: './delete-result.component.css'
})
export class DeleteResultComponent {
  exam: Exam;
  constructor(
    public dialogRef: MatDialogRef<DeleteResultComponent>,
    private resultService: ResultService,
    private snackbarService: SnackbarService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){
    this.exam = this.data.exam;
  }

  deleteResult(): void {
      this.resultService.deleteResults(this.exam.id).subscribe(
        () => {
          this.snackbarService.showSuccess('Resultados eliminados correctamente.');
          this.dialogRef.close();
          this.router.navigate(['/exam-list/'+ this.exam.subject_id]);
        }
      );

  }
}
