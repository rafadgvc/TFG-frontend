import {Component, Inject} from '@angular/core';
import {Subject} from "../../../models/subject";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SubjectService} from "../../../services/subject.service";
import {Router} from "@angular/router";
import {SnackbarService} from "../../../services/snackbar.service";
import {ExamService} from "../../../services/exam_service";
import {HierarchyNode} from "../../../models/hierarchy-node";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-exam-section-modal',
  templateUrl: './exam-section-modal.component.html',
  styleUrl: './exam-section-modal.component.css'
})
export class ExamSectionModalComponent {
  nodes: HierarchyNode[] = [];
  subjectId: number;
  sectionId: number;
  types: string[] = ['Test', 'Desarrollo', 'Ninguno'];
  sectionForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ExamSectionModalComponent>,
    private examService: ExamService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.nodes = this.data.nodes;
    this.subjectId = this.data.subjectId;
    this.sectionId = this.data.sectionId;
    this.sectionForm = this.formBuilder.group({
      node: [''],
      difficulty: ['', [Validators.min(1), Validators.max(10)]],
      time: ['', [Validators.min(1)]],
      type: ['']
    })
  }

  searchQuestions(): void{
    console.log('aa');
  }
}
