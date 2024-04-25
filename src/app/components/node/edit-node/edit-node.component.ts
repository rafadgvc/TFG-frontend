import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HierarchyNode, HierarchyNodeList} from "../../../models/hierarchy-node";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-node',
  templateUrl: './edit-node.component.html',
  styleUrl: './edit-node.component.css'
})
export class EditNodeComponent {
  nodeForm: FormGroup;
  nodeList: HierarchyNodeList;
  node: HierarchyNode;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditNodeComponent>
  ) {
    this.node = new HierarchyNode(8, 'Selección', 2);

    this.nodeForm = this.formBuilder.group({
      name: [this.node.name, Validators.required],
      parent: [this.node.parent, Validators.required]
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

      this.node.name = nodeData.name;
      this.node.parent = nodeData.parent;

      console.log(this.node);
      //TODO: Cambiar a usar el servicio
      this.dialogRef.close();
    } else {
      console.log('Invalid form');
    }
  }
}
