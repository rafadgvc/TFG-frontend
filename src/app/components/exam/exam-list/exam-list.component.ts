import {Component, OnInit} from '@angular/core';
import {Question, QuestionList} from "../../../models/question";
import {QuestionService} from "../../../services/question.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AddQuestionComponent} from "../../question/add-question/add-question.component";
import {Exam} from "../../../models/exam";
import {ExamService} from "../../../services/exam_service";

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
      // Llamar al servicio para obtener la pregunta según el id
      if (this.id != null) {
        this.loadSubjectExams(this.id);
      }
    });
  }

  loadSubjectExams(id: number): void {
    this.loading = true;
    this.examService.getSubjectExams(id).subscribe(
      examList => {
        this.examList = examList.items;
        this.loading = false;
      },
    );
  }

  viewExam(examId: number): void {
    this.router.navigate(['/exam/' + examId]);
  }

  addExam(subjectId: number): void {
    // TODO: Cambiar a añadir examen
    this.router.navigate(['/add-exam/' + subjectId]);
  }
}
