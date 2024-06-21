import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Exam} from "../../../models/exam";
import {ExamService} from "../../../services/exam_service";
import {DeleteExamComponent} from "../delete-exam/delete-exam.component";

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrl: './exam-list.component.css'
})
export class ExamListComponent implements OnInit{
  id: number = 0;
  loading: boolean = true;
  examList: Exam[] = [];
  displayedColumns: string[] = ['title', 'difficulty', 'time', 'questions', 'actions'];



  constructor(
    private examService: ExamService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id != null) {
        this.loadSubjectExams(this.id);
      }
    });
  }

  /* Gets the Subject's Exams */
  loadSubjectExams(id: number): void {
    this.loading = true;
    this.examService.getSubjectExams(id).subscribe(
      examList => {
        this.examList = examList.items;
        this.loading = false;
      },
    );
  }

  /* Navigates to an Exam's details */
  viewExam(examId: number): void {
    this.router.navigate(['/exam/' + examId]);
  }

  /* Navigates to add an Exam */
  addExam(subjectId: number): void {
    this.router.navigate(['/add-exam/' + subjectId]);
  }

  /* Navigates to the Exam's Subject */
  viewSubject(subjectId: number): void {
    this.router.navigate(['/subject/' + subjectId]);
  }

  /* Opens a modal to delete an Exam */
  deleteExam(exam: Exam): void {
    const dialogRef = this.dialog.open(DeleteExamComponent, {
      width: '400px',
      data: {
        exam: exam
      }
    });
  }

}
