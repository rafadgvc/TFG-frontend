import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-import-questions',
  templateUrl: './import-questions.component.html',
  styleUrl: './import-questions.component.css'
})
export class ImportQuestionsComponent {


  selectedFile: File | null = null;
  constructor(
    public dialogRef: MatDialogRef<ImportQuestionsComponent>,
    private router: Router,
  ){}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0]; // Obtener el primer archivo seleccionado
  }

  importQuestions(): void {
      this.dialogRef.close();
  }

}
