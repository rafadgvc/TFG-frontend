import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {HierarchyNode, HierarchyNodeList} from '../../../models/hierarchy-node';
import { AddNodeComponent } from '../add-node/add-node.component';
import {AddQuestionComponent} from "../../question/add-question/add-question.component";

@Component({
  selector: 'app-node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.css']
})
export class NodeListComponent {
  id?: number;
  nodeList: any[] = []; // Cambiamos el tipo de HierarchyNode[] a any[]
  selectedNode: any; // Cambiamos el tipo de HierarchyNode a any
  preheatedNodes: HierarchyNode[] = [];
  rootNode: any;

  constructor(
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
    // TODO: Llamar al servicio para obtener los nodos
    this.preheatedNodes = [
      new HierarchyNode(1, "Fundamentos de Bases de Datos", NaN),
      new HierarchyNode(2, "Conceptos Básicos", 1),
      new HierarchyNode(3, "Operadores SQL", 1),
      new HierarchyNode(4, "Álgebra Relacional", 1),
      new HierarchyNode(5, "Tabla", 2),
      new HierarchyNode(6, "Columna", 5),
      new HierarchyNode(7, "Fila", 5),
      new HierarchyNode(8, "Selección", 4),
      new HierarchyNode(9, "Proyección", 4),
    ];

    this.nodeList = this.convertToTreeNodeList(this.preheatedNodes);
  }

  convertToTreeNodeList(nodes: HierarchyNode[]): any[] {
    const nodeMap = new Map<number, any>();

    // Paso 1: Crear un mapa de nodos usando el ID como clave
    nodes.forEach(node => {
      nodeMap.set(node.id, { ...node, children: [] });
    });

    // Paso 2: Construir la estructura del árbol
    nodes.forEach(node => {
      if (node.parent && nodeMap.has(node.parent)) {
        const parentNode = nodeMap.get(node.parent);
        parentNode.children.push(nodeMap.get(node.id));
      }
    });

    // Paso 3: Encontrar el nodo raíz(es)
    const treeNodes: any[] = [];
    nodeMap.forEach((value, key) => {
      console.log(value);
      if (!nodes.find(node => node.id === value.parent)) {
        treeNodes.push(value);
        console.log('ooo');
        this.rootNode = value;
      }
      else{
        console.log('aaa')
      }
    });

    return treeNodes;
  }

  openAddNodeModal(id: number = NaN): void {
    const dialogRef = this.dialog.open(AddNodeComponent, {
      width: '800px',
      maxHeight: '700px',
      data: {}

    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadHierarchySubjectNodes(3);

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
  if (currentNode === targetNode) {
    // Si encontramos el nodo, devolvemos su profundidad multiplicada por 1.25
    return currentDepth * 1.25;
  } else if (currentNode.children && currentNode.children.length > 0) {
    // Si el nodo actual no es el buscado, buscamos en sus hijos
    for (const child of currentNode.children) {
      const result = this.dfs(child, targetNode, currentDepth + 1);
      if (result !== null) {
        return result; // Si encontramos el nodo en algún hijo, devolvemos su profundidad
      }
    }
  }
  return null; // Si no encontramos el nodo, devolvemos null
};

calculateMarginLeft(node: any): number {
  // Llamamos a la función de búsqueda en profundidad desde el nodo raíz con profundidad 1
  const marginLeft = this.dfs(this.rootNode, node, 1);

  if (marginLeft === null) {
    // Si no se encontró el nodo, devolvemos 0
    return 0;
  }

  return marginLeft;
}








  // Otros métodos del componente según sea necesario
}
