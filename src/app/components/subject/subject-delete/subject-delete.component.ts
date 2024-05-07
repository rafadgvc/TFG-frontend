import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SubjectService} from "../../../services/subject.service";
import {Subject} from "../../../models/subject";
import {Router} from "@angular/router";
import {SnackbarService} from "../../../services/snackbar.service";

@Component({
  selector: 'app-subject-delete',
  templateUrl: './subject-delete.component.html',
  styleUrl: './subject-delete.component.css'
})
export class SubjectDeleteComponent {
  subject: Subject;

  constructor(
    public dialogRef: MatDialogRef<SubjectDeleteComponent>,
    private subjectService: SubjectService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbarService: SnackbarService
  ){
    this.subject = this.data.subject;
  }

  deleteSubject(): void {
        this.subjectService.deleteSubject(this.subject).subscribe(
        () => {
          this.snackbarService.showSuccess('Asignatura eliminada correctamente.');
          this.dialogRef.close();
          this.router.navigate(['/home']);
        }
      );

  }


}
