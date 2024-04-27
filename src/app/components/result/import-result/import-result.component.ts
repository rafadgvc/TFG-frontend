import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {SubjectService} from "../../../services/subject.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-import-result',
  templateUrl: './import-result.component.html',
  styleUrl: './import-result.component.css'
})
export class ImportResultComponent {

  selectedFile: File | null = null; 
  constructor(
    public dialogRef: MatDialogRef<ImportResultComponent>,
    private router: Router,
  ){}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0]; // Obtener el primer archivo seleccionado
  }

  importResult(): void {
      this.dialogRef.close();
  }

}
