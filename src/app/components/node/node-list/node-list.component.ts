import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {HierarchyNode, HierarchyNodeList} from '../../../models/hierarchy-node';
import { AddNodeComponent } from '../add-node/add-node.component';
import {AddQuestionComponent} from "../../question/add-question/add-question.component";
import {NodeService} from "../../../services/node.service";

@Component({
  selector: 'app-node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.css']
})
export class NodeListComponent implements OnInit{
  id?: number;
  nodeTree: any[] = []; // Cambiamos el tipo de HierarchyNode[] a any[]
  selectedNode: any; // Cambiamos el tipo de HierarchyNode a any
  nodeList: HierarchyNode[] = [];
  rootNode: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private nodeService: NodeService
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
    // TODO: Llamar al servicio para obtener los nodos
    this.nodeService.getSubjectNodes(id).subscribe(
      nodeList => {
        this.nodeList = nodeList.items;
        this.nodeTree = this.convertToTreeNodeList(this.nodeList);
      },
    );


  }

  convertToTreeNodeList(nodes: HierarchyNode[]): any[] {
    // TODO: Ordenar el array para que se muestren en el orden correcto
    const nodeMap = new Map<number, any>();

    // Paso 1: Crear un mapa de nodos usando el ID como clave
    nodes.forEach(node => {
      nodeMap.set(node.id, { ...node, children: [] });
    });

    // Paso 2: Construir la estructura del árbol
    nodes.forEach(node => {
      if (node.parent_id && nodeMap.has(node.parent_id)) {
        const parentNode = nodeMap.get(node.parent_id);
        parentNode.children.push(nodeMap.get(node.id));
      }
    });

    // Paso 3: Encontrar el nodo raíz(es)
    const treeNodes: any[] = [];
    nodeMap.forEach((value, key) => {
      if (!nodes.find(node => node.id === value.parent_id)) {
        treeNodes.push(value);
        this.rootNode = value;
      }
    });

    return treeNodes;
  }

  openAddNodeModal(id: number = NaN): void {
    const dialogRef = this.dialog.open(AddNodeComponent, {
      width: '800px',
      maxHeight: '700px',
      data: {
        nodeList: this.nodeList,
        selectedNodeId: id,
        subjectId: this.id,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(this.id) {
        this.loadHierarchySubjectNodes(this.id);
      }
    });
  }

  viewNode(nodeId: number): void {
    this.router.navigate(['/node/' + nodeId]);
  }

  openAddQuestionModal(nodeId: number): void {
    const dialogRef = this.dialog.open(AddQuestionComponent, {
      width: '800px',
      maxHeight: '700px',
      data: { nodeId: nodeId }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Lógica después de cerrar el diálogo
    });
  }

  nodeSelected(node: any): void {
    // Tu lógica para manejar la selección de un nodo
  }

  // Función auxiliar para buscar el nodo y calcular su profundidad
  dfs = (currentNode: any, targetNode: any, currentDepth: number): number | null => {
  if (currentNode.id === targetNode.id) {

    return currentDepth * 1.25;
  } else if (currentNode.children && currentNode.children.length > 0) {

    for (const child of currentNode.children) {
      const result = this.dfs(child, targetNode, currentDepth + 1);
      if (result !== null) {
        return result;
      }
    }
  }
  return null;
};

calculateMarginLeft(node: any): number {
  // Nivel base para el margen izquierdo
  const baseMargin = 1; // Puedes ajustar este valor según lo que se vea mejor

  // Obtener la profundidad del nodo
  const depth = this.dfs(this.rootNode, node, 1);

  if (depth === null) {
    // Si no se encontró el nodo, devolvemos 0
    return 0;
  }

  // Calcular el margen izquierdo en relación con el nivel del nodo
  return baseMargin * depth;
}
}
