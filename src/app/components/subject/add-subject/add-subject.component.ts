import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SubjectService } from "../../../services/subject.service";
import { Subject } from "../../../models/subject";
import { SnackbarService } from "../../../services/snackbar.service";

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {
  subjectForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddSubjectComponent>,
    private subjectService: SubjectService,
    private snackbarService: SnackbarService
  ) {
    this.subjectForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  submitForm(): void {
    if (this.subjectForm.valid) {
      const subjectName = this.subjectForm.value.name;
      const newSubject: Subject = {
        id: NaN,
        name: subjectName
      };

      this.subjectService.addSubject(newSubject).subscribe(
        () => {
          this.snackbarService.showSuccess('Asignatura agregada correctamente.');
          this.dialogRef.close();
        }
      );
    }
  }
}
