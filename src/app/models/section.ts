export class Section {
  id: number;
  node_id?: number;
  question_number?: number;
  type?: string[];
  difficulty?: number;
  time? : number;
  repeat?: boolean;

  constructor (
    id: number,
    node_id?: number,
    question_number?: number,
    type?: string[],
    difficulty?: number,
    time? : number,
    repeat?: boolean,
  ){
    this.id = id;
    this.node_id = node_id;
    this.question_number = question_number;
    this.type = type;
    this.difficulty = difficulty;
    this.time = time;
    this.repeat = repeat;
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
