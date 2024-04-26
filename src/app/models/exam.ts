import {QuestionList} from "./question";


export class Exam{
  id: number;
  title: string;
  difficulty: number;
  time: number;
  questions?: QuestionList;
  subject_id?: number;

  constructor (
    id: number,
    title: string,
    difficulty: number,
    time: number,
    questions?: QuestionList,
    subject_id?: number
  ){
    this.id = id;
    this.title = title;
    this.difficulty = difficulty;
    this.time = time;
    this.questions = questions;
    this.subject_id = subject_id;
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