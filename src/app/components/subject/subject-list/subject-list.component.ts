import { Component, OnInit } from '@angular/core';
import { Subject, SubjectList } from "../../../models/subject";
import { SubjectService } from "../../../services/subject.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { AddSubjectComponent } from "../add-subject/add-subject.component";
import { SnackbarService } from "../../../services/snackbar.service";

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  subjectList: Subject[] = [];
  displayedColumns: string[] = ['name', 'questionNumber', 'subject', 'questions', 'exams'];

  constructor(
    private subjectService: SubjectService,
    private router: Router,
    public dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loadUserSubjects();
  }

  loadUserSubjects(): void {
    this.subjectService.getUserSubjects().subscribe(
      subjectList => {
        this.subjectList = subjectList.items;
      },
    );
  }

  viewSubject(subjectId: number): void {
    this.router.navigate(['/subject/' + subjectId]);
  }

  viewQuestionList(subjectId: number): void {
    this.router.navigate(['/question-list/' + subjectId]);
  }

  viewExamList(subjectId: number): void {
    this.router.navigate(['/exam-list/' + subjectId]);
  }

  openAddQuestionModal(): void {
    const dialogRef = this.dialog.open(AddSubjectComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadUserSubjects();
    });
  }
}
