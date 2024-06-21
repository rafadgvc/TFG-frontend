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

  /* Gets the Exam */
  populateExam(id: number) {
    this.examService.getExam(id).subscribe(exam => {
      this.exam = exam;
      this.loading = false;
    });
  }

  /* Opens a modal to edit the Exam */
  editExam(): void {
    this.router.navigate(['/edit-exam/' + this.exam?.id]);
  }

  /* Opens a modal to export the Exam */
  exportExam(): void {
    const dialogRef = this.dialog.open(ExportExamComponent, {
      width: '400px',
      data: {
        exam: this.exam
      }
    });
  }

  /* Opens a modal to import Results for the Exam */
  importResults(): void {
    const dialogRef = this.dialog.open(ImportResultComponent, {
      width: '400px',
      data: {
        exam: this.exam
      }
    });
  }

  /* Opens a modal to deletes the Exam's Results */
  deleteResults(): void {
    const dialogRef = this.dialog.open(DeleteResultComponent, {
      width: '400px',
      data: {
        exam: this.exam
      }
    });
  }

  /* Formats the points to be seen as a percentage */
  formatPoints(points: number): string {
    return ("" + points + " %");
  }
}
