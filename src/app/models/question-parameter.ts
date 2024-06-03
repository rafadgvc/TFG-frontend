export class QuestionParameter {
  id: number;
  value: string;
  group: number;
  position: number;
  question_id?: number;
  subject_id?: number;

  constructor (
    id: number,
    value: string,
    group: number,
    position: number,
    question_id?: number,
    subject_id?: number,
  ){
    this.id = id;
    this.value = value;
    this.group = group;
    this.position = position;
    this.question_id = question_id;
    this.subject_id = subject_id;
  }
}

export class QuestionParameterList {
  items: QuestionParameter[];
  total: number;

  constructor(items: QuestionParameter[]) {
    this.items = items;
    this.total = items.length;
  }
}
