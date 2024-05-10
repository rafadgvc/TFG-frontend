import {AnswerList} from "./answer";
import {HierarchyNode, HierarchyNodeList} from "./hierarchy-node";

export class Question{
  id: number;
  title: string;
  difficulty: number;
  time: number;
  type: string;
  active: boolean;
  answers?: AnswerList;
  points?: number;
  nodes?: HierarchyNodeList;
  node_ids?: number[];
  subject_id?: number;
  connected?: boolean;

  constructor (
    id: number,
    title: string,
    difficulty: number,
    time: number,
    type: string,
    active: boolean,
    answers?: AnswerList,
    points?: number,
    nodes?: HierarchyNodeList,
    node_ids?: number[],
    subject_id?: number,
    connected?: boolean,
  ){
    this.id = id;
    this.title = title;
    this.difficulty = difficulty;
    this.time = time;
    this.type = type;
    this.active = active;
    this.answers = answers;
    this.points = points;
    this.nodes = nodes;
    this.node_ids = node_ids;
    this.subject_id = subject_id;
    this.connected = connected;
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
