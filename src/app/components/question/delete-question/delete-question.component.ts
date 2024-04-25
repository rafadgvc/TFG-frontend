import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {SubjectService} from "../../../services/subject.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delete-question',
  templateUrl: './delete-question.component.html',
  styleUrl: './delete-question.component.css'
})
export class DeleteQuestionComponent {


  constructor(
    public dialogRef: MatDialogRef<DeleteQuestionComponent>,
    private subjectService: SubjectService,
    private router: Router,
  ){}

  deleteQuestion(): void {

      this.dialogRef.close();
      this.router.navigate(['/home']);

  }



}
