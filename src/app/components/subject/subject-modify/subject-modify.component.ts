import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SubjectService} from "../../../services/subject.service";
import {Subject} from "../../../models/subject";
import {SnackbarService} from "../../../services/snackbar.service";

@Component({
  selector: 'app-subject-modify',
  templateUrl: './subject-modify.component.html',
  styleUrl: './subject-modify.component.css'
})
export class SubjectModifyComponent {
  subjectForm: FormGroup;
  subject: Subject = new Subject(1, 'string');

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SubjectModifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subjectService: SubjectService,
    private snackbarService: SnackbarService
  ) {
    this.subject = this.data.subject;
    this.subjectForm = this.formBuilder.group({
      name: [this.subject.name, Validators.required]
    });
  }

  /* Edits the subject */
  submitForm(): void {
    if (this.subjectForm.valid) {
      this.subject.name = this.subjectForm.value.name;
      this.subjectService.updateSubject(this.subject).subscribe(
        () => {
          this.snackbarService.showSuccess('Asignatura modificada correctamente.');
          this.dialogRef.close();
        }
      );
      this.dialogRef.close();
    }
  }
}
