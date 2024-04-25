import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {SubjectService} from "../../../services/subject.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delete-exam',
  templateUrl: './delete-exam.component.html',
  styleUrl: './delete-exam.component.css'
})
export class DeleteExamComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteExamComponent>,
    private subjectService: SubjectService,
    private router: Router,
  ){}

  deleteExam(): void {
    // TODO: Usar servicio para borrar examen
      this.dialogRef.close();
      this.router.navigate(['/home']);
  }
}
