import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {NodeService} from "../../../services/node.service";
import {HierarchyNode} from "../../../models/hierarchy-node";
import {SnackbarService} from "../../../services/snackbar.service";

@Component({
  selector: 'app-delete-node',
  templateUrl: './delete-node.component.html',
  styleUrl: './delete-node.component.css'
})
export class DeleteNodeComponent {

  node: HierarchyNode;

  constructor(
    public dialogRef: MatDialogRef<DeleteNodeComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private nodeService: NodeService,
    private snackbarService: SnackbarService
  ){
    this.node = this.data.node;
  }

  deleteNode(): void {
      this.nodeService.deleteNode(this.node).subscribe(
        () => {
          this.snackbarService.showSuccess('Nodo modificado correctamente.');
          this.dialogRef.close();
          this.router.navigate(['/home']);
        }
      );

  }
}
