import {Question, QuestionList} from "./question";

export class Section {
  id: number;
  node_id?: number;
  question_number?: number;
  type?: string[];
  difficulty?: number;
  time? : number;
  repeat?: boolean;
  questions?: QuestionList;

  constructor (
    id: number,
    node_id?: number,
    question_number?: number,
    type?: string[],
    difficulty?: number,
    time? : number,
    repeat?: boolean,
    questions?: QuestionList,
  ){
    this.id = id;
    this.node_id = node_id;
    this.question_number = question_number;
    this.type = type;
    this.difficulty = difficulty;
    this.time = time;
    this.repeat = repeat;
    this.questions = questions;
  }
}

export class SectionList {
  items: Section[];
  total: number;

  constructor(items: Section[]) {
    this.items = items;
    this.total = items.length;
  }
}
