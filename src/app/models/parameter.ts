export class Parameter {
  id: number;
  value: string;

  constructor (
    id: number,
    value: string
  ){
    this.id = id;
    this.value = value;
  }
}

export class ParameterList {
  items: Parameter[];
  total: number;

  constructor(items: Parameter[]) {
    this.items = items;
    this.total = items.length;
  }
}
