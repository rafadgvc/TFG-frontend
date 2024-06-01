import {Question, QuestionList} from "./question";

export class Section {
  id: number;
  node_ids?: number[];
  question_number?: number;
  type?: string[];
  difficulty?: number;
  time? : number;
  repeat?: boolean;
  questions?: QuestionList;
  exclude_ids?: number[];

  constructor (
    id: number,
    node_ids?: number[],
    question_number?: number,
    type?: string[],
    difficulty?: number,
    time? : number,
    repeat?: boolean,
    questions?: QuestionList,
    exclude_ids?: number[],
  ){
    this.id = id;
    this.node_ids = node_ids;
    this.question_number = question_number;
    this.type = type;
    this.difficulty = difficulty;
    this.time = time;
    this.repeat = repeat;
    this.questions = questions;
    this.exclude_ids = exclude_ids;
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
