import {Component, OnInit} from '@angular/core';
import {SubjectService} from "../../services/subject.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "../../models/subject";
import {AddSubjectComponent} from "../add-subject/add-subject.component";
import {MatDialog} from "@angular/material/dialog";
import {SubjectDeleteComponent} from "../subject-delete/subject-delete.component";
import {SubjectModifyComponent} from "../subject-modify/subject-modify.component";

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrl: './subject-detail.component.css'
})
export class SubjectDetailComponent implements OnInit{
  // Subject to be shown
  subject?: Subject;

  // TODO: Añadir estadísticas de la asignatura

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
      // Llamar al servicio para obtener la pregunta según el id
      if (this.id != null) {
        this.loadSubject(this.id);
      }
    });
  }

  loadSubject(id: number) {
    this.subjectService.getSubject(id).subscribe(subject => {
        this.subject = subject;
      });
  }

  editSubject(): void {
    const dialogRef = this.dialog.open(SubjectModifyComponent, {
      width: '400px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (this.id != null) {
        this.loadSubject(this.id);
      }

    });
  }

  deleteSubject(): void {
    const dialogRef = this.dialog.open(SubjectDeleteComponent, {
      width: '400px',
      data: {}
    });
  }

  viewQuestionList(): void {
    this.router.navigate(['/question-list/' + this.id]);
  }

  viewExamList(): void {
    //this.router.navigate(['/exam-list/' + subjectId]);
  }

}
