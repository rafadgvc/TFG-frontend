import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ResultService } from "../../../services/result.service";
import { SnackbarService } from "../../../services/snackbar.service";
import { Exam } from "../../../models/exam";

@Component({
  selector: 'app-import-result',
  templateUrl: './import-result.component.html',
  styleUrls: ['./import-result.component.css']
})
export class ImportResultComponent {

  selectedFile: File | null = null;
  exam: Exam;
  constructor(
    public dialogRef: MatDialogRef<ImportResultComponent>,
    private resultService: ResultService,
    private snackbarService: SnackbarService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){
    this.exam = this.data.exam;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  importResult(): void {
    if (this.selectedFile !== null) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('examId', this.exam.id.toString());

      this.resultService.importResults(formData).subscribe(
        () => {
          this.snackbarService.showSuccess('Resultados añadidos correctamente.');
          this.dialogRef.close();
          this.router.navigate(['/exam-list/' + this.exam.subject_id]);
        },
        error => {
          this.snackbarService.showError('Error al importar los resultados.');
        }
      );
    }
  }
}
