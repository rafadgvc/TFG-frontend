export class QuestionParameter {
  id: number;
  parameters: string[];
  question_id?: number;
  uses?: number;
  subject_id?: number;

  constructor (
    id: number,
    parameters: string[],
    question_id?: number,
    uses?: number,
    subject_id?: number,
  ){
    this.id = id;
    this.parameters = parameters;
    this.question_id = question_id;
    this.uses = uses;
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
