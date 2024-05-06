import {Component, OnInit} from '@angular/core';
import {DeleteNodeComponent} from "../delete-node/delete-node.component";
import {EditNodeComponent} from "../edit-node/edit-node.component";
import {HierarchyNode} from "../../../models/hierarchy-node";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {NodeService} from "../../../services/node.service";

@Component({
  selector: 'app-node-detail',
  templateUrl: './node-detail.component.html',
  styleUrl: './node-detail.component.css'
})
export class NodeDetailComponent implements OnInit{
  // Subject to be shown
  node?: HierarchyNode;

  // TODO: Añadir estadísticas de la asignatura

  id?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private nodeService: NodeService
    ) {
  }

  ngOnInit():void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      // Llamar al servicio para obtener la pregunta según el id
      if (this.id != null) {
        this.loadNode(this.id);
      }
    });
  }

  loadNode(id: number) {
    // Llamar al servicio para obtener el nodo según el id
    this.nodeService.getNode(id).subscribe(node => {
      this.node = node;
    });
  }

  editNode(): void {
    const dialogRef = this.dialog.open(EditNodeComponent, {
      width: '800px',
      maxHeight: '700px',
      data: {
        node: this.node
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (this.id != null) {
        this.loadNode(this.id);
      }

    });
  }

  deleteNode(): void {
    const dialogRef = this.dialog.open(DeleteNodeComponent, {
      width: '400px',
      data: {}
    });
  }

}
