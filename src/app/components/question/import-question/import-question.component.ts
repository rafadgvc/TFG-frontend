import {Component, Inject} from '@angular/core';
import {Exam} from "../../../models/exam";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ResultService} from "../../../services/result.service";
import {SnackbarService} from "../../../services/snackbar.service";
import {Router} from "@angular/router";
import {QuestionService} from "../../../services/question.service";

@Component({
  selector: 'app-import-question',
  templateUrl: './import-question.component.html',
  styleUrl: './import-question.component.css'
})
export class ImportQuestionComponent {

  selectedFormat: string = 'CSV';
  selectedDifficulty: number = 1;
  selectedTime : number = 1;
  selectedFile: File | null = null;
  subject_id: number = 0;
  constructor(
    public dialogRef: MatDialogRef<ImportQuestionComponent>,
    private questionService: QuestionService,
    private snackbarService: SnackbarService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){
    this.subject_id = this.data.subject_id;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  importQuestions(): void {
    if (this.selectedFile !== null) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      console.log(this.selectedTime)
      console.log(this.selectedDifficulty)

      this.questionService.importQuestions(formData, this.subject_id, this.selectedDifficulty, this.selectedTime).subscribe(
        () => {
          this.snackbarService.showSuccess('Preguntas añadidas correctamente.');
          this.dialogRef.close();
        },
        error => {
          this.snackbarService.showError('Error al importar las preguntas.');
        }
      );
    }
  }
}
