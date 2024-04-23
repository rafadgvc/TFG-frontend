import {Component, OnInit} from '@angular/core';
import {SubjectService} from "../../services/subject.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "../../models/subject";

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrl: './subject-detail.component.css'
})
export class SubjectDetailComponent implements OnInit{
  // Question to be shown
  subject?: Subject;

  constructor(private subjectService: SubjectService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit():void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      // Llamar al servicio para obtener la pregunta según el id
      this.subjectService.getSubject(id).subscribe(subject => {
        this.subject = subject;
      });
    });
  }

  editSubject(): void {
    //this.router.navigate(['/exam-list/' + subjectId]);
  }

  deleteSubject(): void {
    //this.router.navigate(['/exam-list/' + subjectId]);
  }

  viewQuestionList(): void {
    //this.router.navigate(['/question-list/' + subjectId]);
  }

  viewExamList(): void {
    //this.router.navigate(['/exam-list/' + subjectId]);
  }

}
