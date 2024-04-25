import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Question} from "../../../models/question";
import {AnswerList} from "../../../models/answer";
import {HierarchyNode, HierarchyNodeList} from "../../../models/hierarchy-node";

@Component({
  selector: 'app-add-level',
  templateUrl: './add-node.component.html',
  styleUrl: './add-node.component.css'
})
export class AddNodeComponent {
  nodeForm: FormGroup;
  nodeList: HierarchyNodeList;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddNodeComponent>
  ) {
    // Inicializar el formulario
    this.nodeForm = this.formBuilder.group({
      name: ['', Validators.required],
      parent: [null, Validators.required]
    });


    this.nodeList = new HierarchyNodeList([
      new HierarchyNode(1, 'FBD', NaN),
      new HierarchyNode(2, 'Conceptos Básicos', 1),
      new HierarchyNode(3, 'Operadores', 1)
    ]);
  }

  submitForm() {
    if (this.nodeForm.valid) {
      const nodeData = this.nodeForm.value;
      const node = new HierarchyNode(
        0,
        nodeData.name,
        nodeData.parent
      );
      console.log(node);
      this.dialogRef.close();
    } else {
      console.log('Invalid form');
    }
  }
}
