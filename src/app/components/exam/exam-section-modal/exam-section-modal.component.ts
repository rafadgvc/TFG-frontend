import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { QuestionService } from "../../../services/question.service";
import { Question, QuestionList } from '../../../models/question';
import { ExamService } from "../../../services/exam_service";
import { Section } from "../../../models/section";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-exam-section-modal',
  templateUrl: './exam-section-modal.component.html',
  styleUrl: './exam-section-modal.component.css'
})
export class ExamSectionModalComponent {
  subjectId: number = 0;
  nodeIds: number[] = [];
  loading: boolean = true;
  section: Section;
  questionList: Question[] = [];
  displayedColumns: string[] = ['title', 'difficulty', 'time', 'type', 'select'];
  dataSource = new MatTableDataSource<Question>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selection: { [key: number]: boolean } = {};
  maxQuestions: number;
  selectedCount: number = 0;

  constructor(
    public dialogRef: MatDialogRef<ExamSectionModalComponent>,
    private questionService: QuestionService,
    private examService: ExamService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.subjectId = this.data.subjectId;
    this.section = this.data.section;
    this.maxQuestions = this.data.maxQuestions;
    this.searchQuestions();
  }

  sortData(sort: Sort) {
    const data = this.questionList.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = new MatTableDataSource(this.questionList);
      this.dataSource.paginator = this.paginator;
      return;
    }


    const sortedData = data.sort((a, b) => {
      if (a.title > b.title){
        return 1;
      }else{
        return -1;
      }
    });

    this.dataSource = new MatTableDataSource(sortedData);
    this.dataSource.paginator = this.paginator;
  }

  searchQuestions(): void {
    this.loading = true;
    this.examService.getQuestionsToSelect(this.section).subscribe(
      questionList => {
        this.questionList = questionList.items;
        this.dataSource = new MatTableDataSource(this.questionList);
        this.loading = false;
        this.dataSource.paginator = this.paginator;

        this.questionList.forEach(question => {
          this.selection[question.id] = false;
        });
      },
    );
  }

  toggleSelection(questionId: number): void {
    if (this.selection[questionId]) {
      this.selectedCount--;
      this.selection[questionId] = false;
    } else if (this.selectedCount < this.maxQuestions) {
      this.selectedCount++;
      this.selection[questionId] = true;
    }
  }

  selectQuestions() {
    const selectedQuestions = new QuestionList(this.questionList.filter(question => this.selection[question.id]));
    this.dialogRef.close(selectedQuestions);
  }
}
