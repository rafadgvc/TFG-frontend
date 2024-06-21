import { Component, OnInit } from '@angular/core';
import { Subject } from "../../../models/subject";
import { SubjectService } from "../../../services/subject.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { AddSubjectComponent } from "../add-subject/add-subject.component";

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  loading: boolean = true;
  subjectList: Subject[] = [];
  displayedColumns: string[] = ['name', 'questionNumber', 'subject', 'questions', 'exams'];

  constructor(
    private subjectService: SubjectService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUserSubjects();
  }

  /* Gets the list of subjects created by a user */
  loadUserSubjects(): void {
    this.loading = true;
    this.subjectService.getUserSubjects().subscribe(
      subjectList => {
        this.subjectList = subjectList.items;
        this.loading = false;
      },
    );
  }

  /* Navigates to the subject details of the selected subject */
  viewSubject(subjectId: number): void {
    this.router.navigate(['/subject/' + subjectId]);
  }

  /* Navigates to the question list of the selected subject */
  viewQuestionList(subjectId: number): void {
    this.router.navigate(['/question-list/' + subjectId]);
  }

  /* Navigates to the exam list of the selected subject */
  viewExamList(subjectId: number): void {
    this.router.navigate(['/exam-list/' + subjectId]);
  }

  /* Opens the modal to add a subject */
  openAddSubjectModal(): void {
    const dialogRef = this.dialog.open(AddSubjectComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadUserSubjects();
    });
  }
}
