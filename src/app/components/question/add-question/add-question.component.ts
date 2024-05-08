import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import {Answer, AnswerList} from "../../../models/answer";
import { Question } from "../../../models/question";
import {ActivatedRoute, Router} from "@angular/router";
import {HierarchyNode, HierarchyNodeList} from "../../../models/hierarchy-node";
import {NodeService} from "../../../services/node.service";
import {QuestionService} from "../../../services/question.service";
import {SnackbarService} from "../../../services/snackbar.service";

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {
  id: number = 0;
  questionForm: FormGroup;
  answers: FormArray;
  pairs: FormArray;
  types: string[] = ['Test', 'Desarrollo', 'Parametrizada'];
  hierarchyNodes: HierarchyNode[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private nodeService: NodeService,
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private snackbarService: SnackbarService
  ) {
  this.questionForm = this.formBuilder.group({
    title: ['', Validators.required],
    difficulty: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
    time: ['', [Validators.required, Validators.min(1)]],
    type: ['', Validators.required],
    nodes: [[], Validators.required],
    answers: this.formBuilder.array([]),
    pairs: this.formBuilder.array([])
  });
  this.answers = this.questionForm.get('answers') as FormArray;
  this.pairs = this.questionForm.get('pairs') as FormArray;

  this.addAnswer();
  this.addAnswer();
  this.addPair();

  this.activatedRoute.params.subscribe(params => {
      this.id = +params['id']; // Convertir a número
      // Llamar al servicio para obtener los nodos correspondientes
      this.nodeService.getSubjectNodes(this.id).subscribe(nodes => {
        this.hierarchyNodes = nodes.items;
      });
    });
}

  addAnswer() {
    this.answers.push(this.formBuilder.group({
      body: ['', Validators.required],
      points: [NaN, [Validators.required, Validators.min(-1), Validators.max(1)]]
    }));
  }

  addPair() {
    this.pairs.push(this.formBuilder.group({
      questionParameter: [''],
      answerParameter: ['']
    }));
  }

  removeAnswer(index: number) {
    this.answers.removeAt(index);
  }

  removePair(index: number) {
    this.pairs.removeAt(index);
  }

  onSubmit() {
  }

  get answersControls() {
    return (this.questionForm.get('answers') as FormArray).controls;
  }

  get pairsControls() {
    return (this.questionForm.get('pairs') as FormArray).controls;
  }

  submitForm(): void {
    if (this.questionForm.valid) {
      const questionData = this.questionForm.value;
      if (questionData.type.toLowerCase() === 'desarrollo'){
        for (let i = 0; i < questionData.answers.length; i++) {
          questionData.answers[i].points = 0;
        }
      }
      const question = new Question(
        0,
        questionData.title,
        +questionData.difficulty,
        +questionData.time,
        questionData.type,
        true,
        new AnswerList(questionData.answers),
        undefined,
        undefined,
        questionData.nodes,
        this.id
      );
      console.log(question)
      // Now you can use 'question' object to save or do whatever you want
      this.questionService.addQuestion(question).subscribe(
        () => {
          this.snackbarService.showSuccess('Pregunta añadida correctamente.');
          this.router.navigate(['/question-list/' + this.id])
        }
      );
    } else {
      console.log('Invalid form');
    }
  }
}
