import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HierarchyNode } from "../../../models/hierarchy-node";
import {NodeService} from "../../../services/node.service";
import {SnackbarService} from "../../../services/snackbar.service";

@Component({
  selector: 'app-add-level',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.css']
})
export class AddNodeComponent {
  nodeForm: FormGroup;
  nodeList: HierarchyNode[];
  selectedNodeId: number;
  subjectId: number;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddNodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private nodeService: NodeService,
    private snackbarService: SnackbarService
  ) {
    this.nodeList = data.nodeList;
    this.selectedNodeId = data.selectedNodeId;
    this.subjectId = data.subjectId;
    this.nodeForm = this.formBuilder.group({
      name: ['', Validators.required],
      parent: [this.selectedNodeId, Validators.required]
    });
  }

  submitForm() {
    if (this.nodeForm.valid) {
      const nodeData = this.nodeForm.value;
      const node = new HierarchyNode(
        NaN,
        nodeData.name,
        nodeData.parent,
        this.subjectId

      );
      this.nodeService.addNode(node).subscribe(
        () => {
          this.snackbarService.showSuccess('Nodo agregado correctamente.');
          this.dialogRef.close();
        }
      );
      this.dialogRef.close();
    } else {
      console.log('Invalid form');
    }
  }
}
