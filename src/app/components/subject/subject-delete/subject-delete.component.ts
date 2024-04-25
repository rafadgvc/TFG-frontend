import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {SubjectService} from "../../../services/subject.service";
import {Subject} from "../../../models/subject";
import {Router} from "@angular/router";

@Component({
  selector: 'app-subject-delete',
  templateUrl: './subject-delete.component.html',
  styleUrl: './subject-delete.component.css'
})
export class SubjectDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<SubjectDeleteComponent>,
    private subjectService: SubjectService,
    private router: Router,
  ){}

  deleteSubject(): void {

      this.dialogRef.close();
      this.router.navigate(['/home']);

  }


}
