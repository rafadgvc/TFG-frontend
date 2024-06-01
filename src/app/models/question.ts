import {AnswerList} from "./answer";
import {HierarchyNode, HierarchyNodeList} from "./hierarchy-node";
import {QuestionParameterList} from "./question-parameter";

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
  question_parameters?: QuestionParameterList;
  section_number?: number;

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
    question_parameters?: QuestionParameterList,
    section_number?: number,
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
    this.question_parameters = question_parameters;
    this.section_number = section_number;
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
