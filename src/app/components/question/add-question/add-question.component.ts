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
  this.addGroup();

  this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.nodeService.getSubjectNodes(this.id).subscribe(nodes => {
        this.hierarchyNodes = nodes.items;
      });
    });
}

  /* Adds an Answer to the form */
  addAnswer() {
    this.answers.push(this.formBuilder.group({
      body: ['', Validators.required],
      points: [NaN, [Validators.required, Validators.min(-100), Validators.max(100)]]
    }));
  }

  /* Adds a new group of QuestionParameters to the form */
  addGroup() {
    this.groups.push(this.formBuilder.group({
      param1: [''],
      param2: [''],
      param3: [''],
      param4: [''],
      param5: [''],
      param6: [''],
      param7: [''],
    }));
  }

  /* Removes an Answer from the form */
  removeAnswer(index: number) {
    this.answers.removeAt(index);
  }

  /* Removes a group of QuestionParameters from the form */
  removeGroup(index: number) {
    this.groups.removeAt(index);
  }

  /* Adds a QuestionParameter to each group of QuestionParameters in the form */
  addParameter(){
    this.parameterNumber += 1;
  }

  /* Removes a QuestionParameter from each group of QuestionParameters in the form */
  removeParameter(){
    this.parameterNumber -= 1;
  }

  get answersControls() {
    return (this.questionForm.get('answers') as FormArray).controls;
  }

  get groupsControls() {
    return (this.questionForm.get('groups') as FormArray).controls;
  }

  /* Creates the Question */
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

        const title = questionData.title;
        const answers = questionData.answers.map((answer: any) => answer.body);
        if (!this.areAllParametersPresent(title, answers, this.parameterNumber)) {
          this.snackbarService.showError('Faltan parámetros en el enunciado o en las respuestas.');
          return;
        }

        for (let i = 0; i < groupNumber; i++) {
          for (let j = 1; (j <= this.parameterNumber); j++) {
            let name = `param${j}`;
            if (this.groupsControls.at(i) !== undefined) {
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

  /* Checks if the Question has all ##param## in the title and the answer's content, and if it matches with the number of QuestionParameters */
  areAllParametersPresent(title: string, answers: string[], parameterNumber: number): boolean {
    let maxParam = this.getMaxParameterUsed(title);

    for (const answer of answers) {
      const maxParamInAnswer = this.getMaxParameterUsed(answer);
      if (maxParamInAnswer > maxParam) {
        maxParam = maxParamInAnswer;
      }
    }

    if (maxParam > parameterNumber) {
      return false;
    }

    for (let i = 1; i <= parameterNumber; i++) {
      const param = `##param${i}##`;
      const titleHasParam = title.includes(param);
      const answersHaveParam = answers.some(answer => answer.includes(param));

      if (!titleHasParam && !answersHaveParam) {
        return false;
      }
    }
    return true;
  }

  /* Gets the number of parameters used in the Question and Answer's content */
  getMaxParameterUsed(text: string): number {
    const paramPattern = /##param(\d+)##/g;
    let match;
    let maxParam = 0;

    while ((match = paramPattern.exec(text)) !== null) {
      const paramNumber = parseInt(match[1], 10);
      if (paramNumber > maxParam) {
        maxParam = paramNumber;
      }
    }

    return maxParam;
  }
}
