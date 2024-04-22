export class Subject{
  id: number;
  name: string;
  question_number?: number;

  constructor (
    id: number,
    name: string,
    question_number?: number,
  ){
    this.id = id;
    this.name = name;
    this.question_number = question_number;
  }
}


export class SubjectList {
  items: Subject[];
  total: number;

  constructor(items: Subject[]) {
    this.items = items;
    this.total = items.length;
  }

  static fromApiResponse(apiResponse: any): Subject {
    // Mapear los nombres de las propiedades manualmente
    return new Subject(
      apiResponse.id,
      apiResponse.name,
      apiResponse.question_number // Asignar el valor a questionNumber
    );
  }
}
