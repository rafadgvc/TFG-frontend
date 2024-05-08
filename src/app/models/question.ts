import {AnswerList} from "./answer";
import {HierarchyNode, HierarchyNodeList} from "./hierarchy-node";

export class Question{
  id: number;
  title: string;
  difficulty: number;
  time: number;
  type: string;
  answers?: AnswerList;
  points?: number;
  nodes?: HierarchyNodeList;
  node_ids?: number[];
  subject_id?: number;

  constructor (
    id: number,
    title: string,
    difficulty: number,
    time: number,
    type: string,
    answers?: AnswerList,
    points?: number,
    nodes?: HierarchyNodeList,
    node_ids?: number[],
    subject_id?: number
  ){
    this.id = id;
    this.title = title;
    this.difficulty = difficulty;
    this.time = time;
    this.type = type;
    this.points = points;
    this.answers = answers;
    this.nodes = nodes;
    this.node_ids = node_ids;
    this.subject_id = subject_id;
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
