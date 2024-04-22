import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {SubjectService} from "../../services/subject.service";
import {Subject} from "../../models/subject";

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
    private subjectService: SubjectService
  ) {
    this.subjectForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  submitForm(): void {
    if (this.subjectForm.valid) {
      const subjectName = this.subjectForm.value.name;


      const newSubject: Subject = {
        id: NaN,
        name: subjectName
      };

      // Llamar al servicio para agregar la asignatura
      this.subjectService.addSubject(newSubject).subscribe(
        result => {
          this.dialogRef.close();
        }
      );
    }
  }
}
