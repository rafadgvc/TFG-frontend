import {AnswerList} from "./answer";

export class Question{
  id: number;
  title: string;
  difficulty: number;
  time: number;
  type: string;
  answers?: AnswerList;
  // subject_id: number;

  constructor (
    id: number,
    title: string,
    difficulty: number,
    time: number,
    type: string,
    answers?: AnswerList
  ){
    this.id = id;
    this.title = title;
    this.difficulty = difficulty;
    this.time = time;
    this.type = type;
    this.answers = answers
  }
}

export class QuestionList {
  items: Question[];
  total: number;

  constructor(items: Question[]) {
    this.items = items;
    this.total = items.length;
  }
}
