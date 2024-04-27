import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {SubjectService} from "../../../services/subject.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delete-result',
  templateUrl: './delete-result.component.html',
  styleUrl: './delete-result.component.css'
})
export class DeleteResultComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteResultComponent>,
    private router: Router,
  ){}

  deleteResult(): void {
      this.dialogRef.close();
      this.router.navigate(['/home']);

  }
}
