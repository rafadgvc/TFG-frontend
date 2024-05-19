import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import {AnswerList} from "../../../models/answer";
import { Question } from "../../../models/question";
import {ActivatedRoute, Router} from "@angular/router";
import {HierarchyNode} from "../../../models/hierarchy-node";
import {NodeService} from "../../../services/node.service";
import {QuestionService} from "../../../services/question.service";
import {SnackbarService} from "../../../services/snackbar.service";
import {QuestionParameter, QuestionParameterList} from "../../../models/question-parameter";

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {
  id: number = 0;
  parameterNumber: number = 1;
  questionForm: FormGroup;
  answers: FormArray;
  groups: FormArray;
  types: string[] = ['Test', 'Desarrollo'];
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
    isParametrized: [false],
    time: ['', [Validators.required, Validators.min(1)]],
    type: ['', Validators.required],
    nodes: [[], Validators.required],
    answers: this.formBuilder.array([]),
    groups: this.formBuilder.array([])
  });
  this.answers = this.questionForm.get('answers') as FormArray;
  this.groups = this.questionForm.get('groups') as FormArray;

  this.addAnswer();
  this.addAnswer();

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

  addGroup() {
    this.groups.push(this.formBuilder.group({
      param1: [''],
      param2: [''],
      param3: [''],
      param4: [''],
      param5: [''],
      param6: [''],
      param7: [''],
      param8: [''],
      param9: [''],
      param10: [''],
    }));
  }

  removeAnswer(index: number) {
    this.answers.removeAt(index);
  }

  removeGroup(index: number) {
    this.groups.removeAt(index);
  }
  addParameter(){
    this.parameterNumber += 1;
  }
  removeParameter(){
    this.parameterNumber -= 1;
  }

  get answersControls() {
    return (this.questionForm.get('answers') as FormArray).controls;
  }

  get groupsControls() {
    return (this.questionForm.get('groups') as FormArray).controls;
  }

  submitForm(): void {
    if (this.questionForm.valid) {
      const questionData = this.questionForm.value;
      let question_parameters = new QuestionParameterList([]);
      if (questionData.type.toLowerCase() === 'desarrollo'){
        for (let i = 0; i < questionData.answers.length; i++) {
          questionData.answers[i].points = 0;
        }
      }
      const groupNumber = this.groupsControls.length;
      if (this.questionForm.get('isParametrized')?.value === true) {

        for (let i = 1; i <= this.parameterNumber; i++) {
          for (let j = 0; j < groupNumber; j++) {
            let name = `param${j}`;
            if (this.groupsControls.at(i) !== undefined) {
              console.log(this.groupsControls.at(i)?.get(name)?.value)
              question_parameters.items.push(new QuestionParameter(NaN, this.groupsControls.at(i)?.get(name)?.value, i+1, j))
            }
          }
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
        this.id,
        false,
        question_parameters

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
