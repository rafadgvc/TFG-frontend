export class Question{
  id: number;
  title: string;
  difficulty: number;
  time: number;
  type: string;
  // subject_id: number;

  constructor (
    id: number,
    title: string,
    difficulty: number,
  time: number,
  type: string,
  ){
    this.id = id;
    this.title = title;
    this.difficulty = difficulty;
    this.time = time;
    this.type = type;
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
