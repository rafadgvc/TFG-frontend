import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {SubjectService} from "../../../services/subject.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-export-exam',
  templateUrl: './export-exam.component.html',
  styleUrl: './export-exam.component.css'
})
export class ExportExamComponent {
  constructor(
    public dialogRef: MatDialogRef<ExportExamComponent>,
    private subjectService: SubjectService,
    private router: Router,
  ){}

  exportExam(): void {
    // TODO: Usar servicio para exportar examen
      this.dialogRef.close();
  }
}
