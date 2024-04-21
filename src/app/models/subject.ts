export class Subject{
  id: number;
  name: string;
  questionNumber?: number;

  constructor (
    id: number,
    name: string,
    questionNumber?: number,
  ){
    this.id = id;
    this.name = name;
    this.questionNumber = questionNumber;
  }
}


export class SubjectList {
  items: Subject[];
  total: number;

  constructor(items: Subject[]) {
    this.items = items;
    this.total = items.length;
  }
}
