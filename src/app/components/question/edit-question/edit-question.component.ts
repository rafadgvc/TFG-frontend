import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Question} from "../../../models/question";
import {AnswerList} from "../../../models/answer";
import {ActivatedRoute, Router} from "@angular/router";
import {HierarchyNode} from "../../../models/hierarchy-node";
import {NodeService} from "../../../services/node.service";
import {QuestionService} from "../../../services/question.service";
import {SnackbarService} from "../../../services/snackbar.service";
import {QuestionParameter, QuestionParameterList} from "../../../models/question-parameter";
import {DeleteQuestionComponent} from "../delete-question/delete-question.component";
import {DisableQuestionComponent} from "../disable-question/disable-question.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrl: './edit-question.component.css'
})
export class EditQuestionComponent {
  id: number = 0;
  parameterNumber: number = 1;
  questionForm: FormGroup;
  answers: FormArray;
  groups: FormArray;
  types: string[] = ['Test', 'Desarrollo'];
  hierarchyNodes: HierarchyNode[] = [];
  question?: Question;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private nodeService: NodeService,
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private snackbarService: SnackbarService,
    public dialog: MatDialog,
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

  this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.questionService.getQuestion(this.id).subscribe(question =>{
        this.question = question;
        this.populateQuestionForm();
      })
    });
  }

  populateQuestionForm(): void {
    if (this.question?.subject_id !== undefined) {
      this.nodeService.getSubjectNodes(this.question?.subject_id).subscribe(nodes => {
        this.hierarchyNodes = nodes.items;
      });
    }
    this.questionForm.get('title')?.patchValue(this.question?.title);
    this.questionForm.get('difficulty')?.patchValue(this.question?.difficulty);
    this.questionForm.get('time')?.patchValue(this.question?.time);
    this.questionForm.get('type')?.patchValue(this.question?.type.toUpperCase());
    this.questionForm.get('nodes')?.patchValue(this.question?.node_ids);
    this.questionForm.get('isParametrized')?.patchValue(<number>this.question?.question_parameters?.items.length > 0);


    if (this.question?.answers !== undefined && this.question.answers.total > 0) {
      const answerNumber = <number>this.question?.answers?.items.length;
      for (let i = 0; i < answerNumber; i++) {
        this.answers.push(this.formBuilder.group({
          body: [this.question?.answers?.items[i].body, Validators.required],
          points: [(this.question?.answers?.items[i].points === undefined) ? NaN : this.question?.answers?.items[i].points, [Validators.required, Validators.min(-100), Validators.max(100)]]
        }));
      }
    }

    if (this.question?.question_parameters !== undefined && this.question.question_parameters.total > 0) {
      const parameterNumber = <number>this.question?.question_parameters?.items[this.question?.question_parameters?.total - 1].position;
      this.parameterNumber = parameterNumber;
      const groupNumber = <number>this.question?.question_parameters?.items[this.question?.question_parameters?.total - 1].group;
      for (let i = 0; i < groupNumber; i++) {
        this.groups.push(this.formBuilder.group({
          param1: [(1 <= parameterNumber && this.question?.question_parameters?.items[i * parameterNumber].value !== undefined)
            ? this.question?.question_parameters?.items[i * parameterNumber].value
            : ''
          ],
          param2: [(2 <= parameterNumber && this.question?.question_parameters?.items[i * parameterNumber + 1].value !== undefined)
            ? this.question?.question_parameters?.items[i * parameterNumber + 1].value
            : ''
          ],
          param3: [(3 <= parameterNumber && this.question?.question_parameters?.items[i * parameterNumber + 2].value !== undefined)
            ? this.question?.question_parameters?.items[i * parameterNumber + 2].value
            : ''
          ],
          param4: [(4 <= parameterNumber && this.question?.question_parameters?.items[i * parameterNumber + 3].value !== undefined)
            ? this.question?.question_parameters?.items[i * parameterNumber + 3].value
            : ''
          ],
          param5: [(5 <= parameterNumber && this.question?.question_parameters?.items[i * parameterNumber + 4].value !== undefined)
            ? this.question?.question_parameters?.items[i * parameterNumber + 4].value
            : ''
          ],
          param6: [(6 <= parameterNumber && this.question?.question_parameters?.items[i * parameterNumber + 5].value !== undefined)
            ? this.question?.question_parameters?.items[i * parameterNumber + 5].value
            : ''
          ],
          param7: [(7 <= parameterNumber && this.question?.question_parameters?.items[i * parameterNumber + 6].value !== undefined)
            ? this.question?.question_parameters?.items[i * parameterNumber + 6].value
            : ''
          ],
          param8: [(8 <= parameterNumber && this.question?.question_parameters?.items[i * parameterNumber + 7].value !== undefined)
            ? this.question?.question_parameters?.items[i * parameterNumber + 7].value
            : ''
          ],
          param9: [(9 <= parameterNumber && this.question?.question_parameters?.items[i * parameterNumber + 8].value !== undefined)
            ? this.question?.question_parameters?.items[i * parameterNumber + 8].value
            : ''

          ],
          param10: [(10 <= parameterNumber && this.question?.question_parameters?.items[i * parameterNumber + 9].value !== undefined)
            ? this.question?.question_parameters?.items[i * parameterNumber + 9].value
            : ''
          ],

        }));
      }
    }
  }

  addAnswer() {
    this.answers.push(this.formBuilder.group({
      body: ['', Validators.required],
      points: [NaN, [Validators.required, Validators.min(-100), Validators.max(100)]]
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

  deleteQuestion(): void {
    const dialogRef = this.dialog.open(DeleteQuestionComponent, {
      width: '400px',
      data: {
        question: this.question
      }
    });
  }

  disableQuestion(): void {
    const dialogRef = this.dialog.open(DisableQuestionComponent, {
      width: '400px',
      data: {
        question: this.question
      }
    });
    dialogRef.afterClosed().subscribe( result => {
      if (this.question?.id) {
        this.router.navigate(['/question/' + this.id])
      }
    });
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
        this.id,
        questionData.title,
        +questionData.difficulty,
        +questionData.time,
        questionData.type,
        true,
        new AnswerList(questionData.answers),
        undefined,
        undefined,
        questionData.nodes,
        this.question?.subject_id,
        false,
        question_parameters

      );
      this.question = question;
      this.questionService.editQuestion(question).subscribe(
        () => {
          this.snackbarService.showSuccess('Pregunta modificada correctamente.');
          this.router.navigate(['/question-list/' + this.question?.subject_id])
        }
      );
    } else {
      console.log('Invalid form');
    }
  }
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
