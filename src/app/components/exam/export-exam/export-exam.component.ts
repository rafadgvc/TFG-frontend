import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SubjectService} from "../../../services/subject.service";
import { saveAs } from "file-saver";
import {Router} from "@angular/router";
import {ExamService} from "../../../services/exam_service";
import { Exam } from '../../../models/exam';

@Component({
  selector: 'app-export-exam',
  templateUrl: './export-exam.component.html',
  styleUrl: './export-exam.component.css'
})
export class ExportExamComponent {
  exam: Exam;
  selectedFormat: string = 'PDF';
  constructor(
    public dialogRef: MatDialogRef<ExportExamComponent>,
    private examService: ExamService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
  ){
    this.exam = this.data.exam;
  }

  exportExam(): void {
    let exportEndpoint: string;

    if (this.selectedFormat === 'Aiken') {
      exportEndpoint = 'export_aiken';
    } else {
      exportEndpoint = 'export_pdf';
    }

    this.examService.exportExam(this.exam.id, exportEndpoint).subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const fileName = `${this.exam.title}.${this.selectedFormat.toLowerCase()}`;
        saveAs(blob, fileName); // Download the file using FileSaver.js
        this.dialogRef.close();
      },
      error => {
        console.error('Error exporting exam:', error);
        // Handle the error
      }
    );
  }
}
