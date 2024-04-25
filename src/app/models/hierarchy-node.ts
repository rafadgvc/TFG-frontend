export class HierarchyNode {
  id: number;
  name: string;
  parent?: number;

  constructor (
    id: number,
    name: string,
    parent?: number,
  ){
    this.id = id;
    this.name = name;
    this.parent = parent;
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
