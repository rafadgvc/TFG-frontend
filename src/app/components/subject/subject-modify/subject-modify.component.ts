import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SubjectService} from "../../../services/subject.service";
import {Subject} from "../../../models/subject";

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
    private subjectService: SubjectService
  ) {
    this.subjectForm = this.formBuilder.group({
      name: [this.subject.name, Validators.required]
    });
  }

  submitForm(): void {
    if (this.subjectForm.valid) {
      const subjectName = this.subjectForm.value.name;


      const newSubject: Subject = {
        id: NaN,
        name: subjectName
      };

      // TODO: Llamar al servicio de asignatura
      this.dialogRef.close();
    }
  }
}
