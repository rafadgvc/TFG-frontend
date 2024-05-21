import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { QuestionService } from "../../../services/question.service";
import {Question, QuestionList} from '../../../models/question';
import {ExamService} from "../../../services/exam_service";

@Component({
  selector: 'app-exam-section-modal',
  templateUrl: './exam-section-modal.component.html',
  styleUrls: ['./exam-section-modal.component.css']
})
export class ExamSectionModalComponent {
  subjectId: number = 0;
  nodeId: number = 0;
  loading: boolean = true;
  questionList: Question[] = [];
  displayedColumns: string[] = ['title', 'difficulty', 'time', 'type', 'select'];
  dataSource = new MatTableDataSource<Question>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selection: { [key: number]: boolean } = {};

  constructor(
    public dialogRef: MatDialogRef<ExamSectionModalComponent>,
    private questionService: QuestionService,
    private examService: ExamService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.subjectId = this.data.subjectId;
    this.nodeId = this.data.nodeId;
    this.searchQuestions();
  }

  searchQuestions(): void {
    this.loading = true;
    let id = (this.nodeId >= 0) ? this.nodeId : this.subjectId;
    this.examService.getQuestionsToSelect(id).subscribe(
      questionList => {
        this.questionList = questionList.items;
        this.dataSource = new MatTableDataSource(this.questionList);
        this.loading = false;
        this.dataSource.paginator = this.paginator;

        // Inicializa el objeto de selección con los ids de las preguntas
        this.questionList.forEach(question => {
          this.selection[question.id] = false;
        });
      },
    );
  }

  selectQuestions() {
    const selectedQuestions = new QuestionList( this.questionList.filter(question => this.selection[question.id]));
    this.dialogRef.close(selectedQuestions);
  }
}
