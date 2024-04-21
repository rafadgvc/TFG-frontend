import { Component, OnInit } from '@angular/core';
import {SubjectList} from "../../models/subject";
import {SubjectService} from "../../services/subject.service";

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  standalone: true,
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  subjectList: SubjectList | undefined;

  constructor(private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.loadUserSubjects();
  }

  loadUserSubjects(): void {
    this.subjectService.getUserSubjects().subscribe(
      subjectList => {
        this.subjectList = subjectList;
      },
    );
  }
}
