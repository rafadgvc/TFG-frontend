import {Exam} from "./exam";
import {Question, QuestionList} from "./question";

export class Result {
  id: number;
  taker: number;
  exam?: Exam;
  questions?: QuestionList;

  constructor (
    id: number,
    taker: number,
    exam?: Exam,
    questions?: QuestionList
  ){
    this.id = id;
    this.taker = taker;
    this.exam = exam;
    this.questions = questions;
  }
}

export class ResultList {
  items: Result[];
  total: number;

  constructor(items: Result[]) {
    this.items = items;
    this.total = items.length;
  }
}
