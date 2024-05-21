import {QuestionList} from "./question";


export class Exam{
  id: number;
  title: string;
  difficulty?: number;
  time?: number;
  questions?: QuestionList;
  subject_id?: number;
  connected?: boolean;
  question_number?: number;
  question_ids?: number[];

  constructor (
    id: number,
    title: string,
    difficulty?: number,
    time?: number,
    questions?: QuestionList,
    subject_id?: number,
    connected?: boolean,
    question_number?: number,
    question_ids?: number[],
  ){
    this.id = id;
    this.title = title;
    this.difficulty = difficulty;
    this.time = time;
    this.questions = questions;
    this.subject_id = subject_id;
    this.connected = connected;
    this.question_number = question_number;
    this.question_ids = question_ids;
  }
}

export class ExamList {
  items: Exam[];
  total: number;

  constructor(items: Exam[]) {
    this.items = items;
    this.total = items.length;
  }
}
