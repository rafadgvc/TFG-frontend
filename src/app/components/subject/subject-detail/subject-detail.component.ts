import {Component, OnInit} from '@angular/core';
import {SubjectService} from "../../../services/subject.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "../../../models/subject";
import {MatDialog} from "@angular/material/dialog";
import {SubjectDeleteComponent} from "../subject-delete/subject-delete.component";
import {SubjectModifyComponent} from "../subject-modify/subject-modify.component";

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrl: './subject-detail.component.css'
})
export class SubjectDetailComponent implements OnInit{
  subject?: Subject;
  id?: number;

  constructor(
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
    ) {}

  ngOnInit():void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id != null) {
        this.loadSubject(this.id);
      }
    });
  }

  /* Gets the selected subject */
  loadSubject(id: number) {
    this.subjectService.getSubject(id).subscribe(subject => {
        this.subject = subject;
      });
  }

  /* Opens a modal to edit the subject */
  editSubject(): void {
    const dialogRef = this.dialog.open(SubjectModifyComponent, {
      width: '400px',
      data: {
        subject: this.subject
      }

    });
    dialogRef.afterClosed().subscribe(result => {
      if (this.id != null) {
        this.loadSubject(this.id);
      }
    });
  }

  /* Opens a modal to delete the subject */
  deleteSubject(): void {
    const dialogRef = this.dialog.open(SubjectDeleteComponent, {
      width: '400px',
      data: {
        subject: this.subject
      }
    });
  }

  /* Navigates to the question list of the selected subject */
  viewQuestionList(): void {
    this.router.navigate(['/question-list/' + this.id]);
  }

  /* Navigates to the node list of the selected subject */
  viewNodeList(): void {
    this.router.navigate(['/node-list/' + this.id]);
  }

  /* Navigates to the exam list of the selected subject */
  viewExamList(): void {
    this.router.navigate(['/exam-list/' + this.id]);
  }

}
