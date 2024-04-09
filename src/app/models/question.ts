

export class Question{
  id: number;
  title: string;
  answer1: string;
  answer2: string;
  answer3: string | undefined;
  answer4: string | undefined;

  constructor (
    id: number,
    title: string,
    answer1: string,
  answer2: string,
  answer3?: string,
  answer4?: string,
  ){
    this.id = id;
    this.title = title;
    this.answer1 = answer1;
    this.answer2 = answer2;
    this.answer3 = answer3;
    this.answer4 = answer4
  }
}
