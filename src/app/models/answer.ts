export class Answer {
  id: number;
  body: string;
  points: number;
  question_id?: number;

  constructor (
    id: number,
    body: string,
    points: number,
    question_id?: number,
  ){
    this.id = id;
    this.body = body;
    this.points = points;
    this.question_id = question_id;
  }
}

export class AnswerList {
  items: Answer[];
  total: number;

  constructor(items: Answer[]) {
    this.items = items;
    this.total = items.length;
  }
}
