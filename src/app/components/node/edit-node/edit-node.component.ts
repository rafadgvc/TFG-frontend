import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HierarchyNode} from "../../../models/hierarchy-node";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NodeService} from "../../../services/node.service";
import {SnackbarService} from "../../../services/snackbar.service";

@Component({
  selector: 'app-edit-node',
  templateUrl: './edit-node.component.html',
  styleUrl: './edit-node.component.css'
})
export class EditNodeComponent {
  nodeForm: FormGroup;
  node: HierarchyNode;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditNodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private nodeService: NodeService,
    private snackbarService: SnackbarService
  ) {
    this.node = this.data.node;

    this.nodeForm = this.formBuilder.group({
      name: [this.node.name, Validators.required]
    });
  }

  /* Edits the HierarchyNode */
  submitForm() {
    if (this.nodeForm.valid) {
       this.node.name = this.nodeForm.value.name;
      this.nodeService.updateNode(this.node).subscribe(
        () => {
          this.snackbarService.showSuccess('Nodo modificado correctamente.');
          this.dialogRef.close();
        }
      );
      this.dialogRef.close();
    }
  }
}
