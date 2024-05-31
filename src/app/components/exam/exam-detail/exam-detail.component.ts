import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Exam} from "../../../models/exam";
import {DeleteExamComponent} from "../delete-exam/delete-exam.component";
import {ExportExamComponent} from "../export-exam/export-exam.component";
import {DeleteResultComponent} from "../../result/delete-result/delete-result.component";
import {ImportResultComponent} from "../../result/import-result/import-result.component";
import {ExamService} from "../../../services/exam_service";

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.css']
})
export class ExamDetailComponent implements OnInit {

  // Exam to be shown
  exam?: Exam;

  id: number = 1;

  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.populateExam(this.id);
    });
  }

  populateExam(id: number) {
    this.examService.getExam(id).subscribe(exam => {
      this.exam = exam;
      this.loading = false;
    });
  }

  editExam(): void {
    this.router.navigate(['/edit-exam/' + this.exam?.id]);
  }

  exportExam(): void {
    const dialogRef = this.dialog.open(ExportExamComponent, {
      width: '400px',
      data: {exam: this.exam}
    });
  }

  deleteExam(): void {
    const dialogRef = this.dialog.open(DeleteExamComponent, {
      width: '400px',
      data: {}
    });
  }

  importResults(): void {
    const dialogRef = this.dialog.open(ImportResultComponent, {
      width: '400px',
      data: {}
    });
  }

  deleteResults(): void {
    const dialogRef = this.dialog.open(DeleteResultComponent, {
      width: '400px',
      data: {
        exam: this.exam
      }
    });
  }

  formatPoints(points: number): string {
    return ("" + points * 100 + " %");
  }
}
