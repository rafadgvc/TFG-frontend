export class Result {
  id: number;
  time: number;
  taker: number;
  points: number;
  exam_id: number;
  exam_title: string;
  question_id: number;
  question_title: string;

  constructor (
    id: number,
    time: number,
    taker: number,
    points: number,
    exam_id: number,
    exam_title: string,
    question_id: number,
    question_title: string,
  ){
    this.id = id;
    this.time = time;
    this.taker = taker;
    this.points = points;
    this.exam_id = exam_id;
    this.exam_title = exam_title;
    this.question_id = question_id;
    this.question_title = question_title;
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
