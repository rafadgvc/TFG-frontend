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
  loading: boolean = true;
  id?: number;
  nodeTree: any[] = [];
  nodeList: HierarchyNode[] = [];
  selectedNode?: HierarchyNode;
  rootNode: any;
  maxDepth: number = 0;

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
    this.loading = true;
    this.nodeService.getSubjectNodes(id).subscribe(
      nodeList => {
        this.nodeList = nodeList.items;
        this.nodeTree = this.convertToTreeNodeList(this.nodeList);
        this.loading = false;
      },
    );


  }

  convertToTreeNodeList(nodes: HierarchyNode[]): any[] {
    // TODO: Ordenar el array para que se muestren en el orden correcto
    const nodeMap = new Map<number, any>();

    nodes.forEach(node => {
      nodeMap.set(node.id, { ...node, children: [] });
    });

    nodes.forEach(node => {
      if (node.parent_id && nodeMap.has(node.parent_id)) {
        const parentNode = nodeMap.get(node.parent_id);
        parentNode.children.push(nodeMap.get(node.id));
      }
    });

    const treeNodes: any[] = [];
    nodeMap.forEach((value, key) => {
      if (!nodes.find(node => node.id === value.parent_id)) {
        treeNodes.push(value);
        this.rootNode = value;
      }
    });

      this.maxDepth = 0;

    const calculateMaxDepth = (node: any, depth: number) => {
      if (depth > this.maxDepth) {
        this.maxDepth = depth;
      }
      if (node.children && node.children.length > 0) {
        for (const child of node.children) {
          calculateMaxDepth(child, depth + 1);
        }
      }
    };

    // Calcula maxDepth para cada nodo raíz
    for (const node of treeNodes) {
      calculateMaxDepth(node, 1);
    }

    console.log(this.maxDepth);
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

  calculateNodeLevel (currentNode: any): number {
    let level = 1;
    let currentParentId = currentNode.parent_id;


    while (currentParentId) {
      const parentNode = this.nodeList.find(n => n.id === currentParentId);
      if (parentNode) {
        level++;
        currentParentId = parentNode.parent_id;
      } else {
        break;
      }
    }

    return level;
  };

  calculateNodeBackground(node: any): string {
  // Función auxiliar para calcular el nivel de un nodo en el árbol

  const rootColor: number[] = [255, 255, 255]; // Blanco
  const deepestColor: number[] = [238, 108, 77]; // #ee6c4d


  const nodeLevel = this.calculateNodeLevel(node);


  const depthPercentage = (nodeLevel - 1) / (this.maxDepth - 1);


  const interpolatedColor = [
    Math.round(rootColor[0] + depthPercentage * (deepestColor[0] - rootColor[0])),
    Math.round(rootColor[1] + depthPercentage * (deepestColor[1] - rootColor[1])),
    Math.round(rootColor[2] + depthPercentage * (deepestColor[2] - rootColor[2]))
  ];

  const colorHex = '#' + interpolatedColor.map(c => c.toString(16).padStart(2, '0')).join('');

  return colorHex;
}



  // Función auxiliar para buscar el nodo y calcular su profundidad
  dfs = (currentNode: any, targetNode: any, currentDepth: number): number | null => {
    if (currentNode.id === targetNode.id) {
      currentNode.level = currentDepth;
      return currentDepth;
    } else if (currentNode.children && currentNode.children.length > 0) {
      for (const child of currentNode.children) {
        const result = this.dfs(child, targetNode, currentDepth + 1);
        if (result !== null) {
          currentNode.level = currentDepth;
          return result;
        }
      }
    }
    return null;
  };

  calculateMarginLeft(node: any): number {

    const baseMargin = 1;


    const depth = this.dfs(this.rootNode, node, 1);

    if (depth === null) {
      return 0;
    }
    return baseMargin * depth;
  }
}
