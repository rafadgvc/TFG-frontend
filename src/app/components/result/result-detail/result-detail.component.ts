import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Exam} from "../../../models/exam";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Result} from "../../../models/result";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ResultService} from "../../../services/result.service";

@Component({
  selector: 'app-result-detail',
  templateUrl: './result-detail.component.html',
  styleUrls: ['./result-detail.component.css']
})
export class ResultDetailComponent implements OnInit {

  @Input() exam?: Exam;
  results: Result[] = [];
  examTitles: string[] = [];
  questionTitles: string[] = [];
  takers: number[] = [];
  selectedExamTitle: string | null = null;
  selectedTaker: number | null = null;
  selectedQuestionTitle: string | null = null;
  dataSource = new MatTableDataSource<Result>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  id: number = 1;
  displayedColumns: string[] = ['taker', 'exam', 'question', 'time', 'points'];

  constructor(
    private resultService: ResultService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = (this.exam?.subject_id !== undefined) ? this.exam.subject_id : 0;
      this.selectedExamTitle = (this.exam?.title !== undefined) ? this.exam.title : null;
      this.populateResults();
    });
  }

  populateResults() {
    this.resultService.getSubjectResults(this.id).subscribe(
      resultList => {
        this.results = resultList.items;
        this.results.sort((a, b) => a.taker - b.taker);
        this.dataSource = new MatTableDataSource(this.results);
        this.loadSelectedFilters();
        if (this.dataSource != undefined) {
          this.dataSource.filterPredicate = this.customFilter;
          this.dataSource.paginator = this.paginator;
        }
      },
    );
  }

  loadSelectedFilters() {
    for (let i = 0; i < this.results.length; i++){
      const res : Result = this.results[i];
      if (this.takers.find((taker) => taker == res.taker) === undefined )
        this.takers.push(res.taker)
      if (this.examTitles.find((title) => title == res.exam_title) === undefined )
        this.examTitles.push(res.exam_title)
      if (this.questionTitles.find((title) => title == res.question_title) === undefined )
        this.questionTitles.push(res.question_title)

    }
    this.takers.sort((a, b) => a - b);
  }

  applyFilter() {
    if (this.dataSource) {
      this.dataSource.filter = JSON.stringify({
        questionTitle: this.selectedQuestionTitle,
        examTitle: this.selectedExamTitle,
        taker: this.selectedTaker
      });
    }
  }

  customFilter(data: Result, filter: string): boolean {
    const searchTerms = JSON.parse(filter);
    return <boolean>(
      (searchTerms.questionTitle === null || data.question_title === searchTerms.questionTitle) &&
      (searchTerms.examTitle === null || data.exam_title === searchTerms.examTitle) &&
      (searchTerms.taker === null || data.taker === searchTerms.taker)
    );
  }

  resetFilters() {
    this.selectedQuestionTitle = null;
    this.selectedExamTitle = null;
    this.selectedTaker = null;
    this.applyFilter();
  }

  formatPoints(points: number): string {
    return ("" + points * 100 + " %");
  }

  formatTime(time: number): string {
    return ("" + time + " min");
  }

  calculateAveragePoints(filteredResults: Result[]): number {
    const totalPoints = filteredResults.reduce((acc, curr) => {
      if (curr.points) {
        return acc + curr.points;
      } else {
        return acc;
      }
    }, 0);
    return filteredResults.length > 0 ? totalPoints / filteredResults.length : 0;
  }

  calculateTotalResults(filteredResults: Result[]): number {
    return filteredResults.length;
  }

  calculateAverageTime(filteredResults: Result[]): number {
    const totalTime = filteredResults.reduce((acc, curr) => {
      if (curr.time) {
        return acc + curr.time;
      } else {
        return acc;
      }
    }, 0);
    return filteredResults.length > 0 ? totalTime / filteredResults.length : 0;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
