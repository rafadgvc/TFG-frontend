import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {SubjectService} from "../../services/subject.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delete-node',
  templateUrl: './delete-node.component.html',
  styleUrl: './delete-node.component.css'
})
export class DeleteNodeComponent {



  constructor(
    public dialogRef: MatDialogRef<DeleteNodeComponent>,
    private subjectService: SubjectService,
    private router: Router,
  ){}

  deleteNode(): void {

      this.dialogRef.close();
      this.router.navigate(['/home']);

  }
}
