import { Component } from '@angular/core';
import {Question} from "../../models/question";
import {QuestionService} from "../../services/question.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AddQuestionComponent} from "../add-question/add-question.component";
import {HierarchyNode} from "../../models/hierarchy-node";
import {AddNodeComponent} from "../add-node/add-node.component";

@Component({
  selector: 'app-node-list',
  templateUrl: './node-list.component.html',
  styleUrl: './node-list.component.css'
})
export class NodeListComponent {
  id?: number;
  nodeList: HierarchyNode[] = [];
  displayedColumns: string[] = ['id', 'name', 'parent', 'actions'];



  constructor(
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      // Llamar al servicio para obtener la pregunta según el id
      if (this.id != null) {
        this.loadHierarchySubjectNodes(this.id);
      }
    });
  }

  loadHierarchySubjectNodes(id: number): void {
    // TODO: Cambiar a llamada al servicio
    const preheatedNodes: HierarchyNode[] = [
      new HierarchyNode(1, "Fundamentos de Bases de Datos", NaN),
      new HierarchyNode(2, "Conceptos Básicos", 1),
      new HierarchyNode(3, "Operadores SQL", 1),
      new HierarchyNode(4, "Álgebra Relacional", 1),
      new HierarchyNode(5, "Tabla", 2),
      new HierarchyNode(6, "Columna", 5),
      new HierarchyNode(7, "Fila", 5),
      new HierarchyNode(8, "Selección", 2),
      new HierarchyNode(9, "Proyección", 2),
    ];
    this.nodeList = preheatedNodes;
  }

  viewSubject(): void {
    this.router.navigate(['/subject/' + this.id]);
  }

  viewNode(nodeId: number): void {
    this.router.navigate(['/node/' + nodeId]);
  }

  openAddNodeModal(): void {
    const dialogRef = this.dialog.open(AddNodeComponent, {
      width: '800px',
      maxHeight: '700px',
      data: {}

    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadHierarchySubjectNodes(3);

    });
  }
}
