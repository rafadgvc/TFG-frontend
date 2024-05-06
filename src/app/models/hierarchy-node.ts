export class HierarchyNode {
  id: number;
  name: string;
  parent_id?: number;
  subject_id?: number;

  constructor (
    id: number,
    name: string,
    parent?: number,
    subject?: number
  ){
    this.id = id;
    this.name = name;
    this.parent_id = parent;
    this.subject_id = subject
  }
}

export class HierarchyNodeList {
  items: HierarchyNode[];
  total: number;

  constructor(items: HierarchyNode[]) {
    this.items = items;
    this.total = items.length;
  }
}
