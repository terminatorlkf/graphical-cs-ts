import { Node } from 'Interfaces/Node';
import { Edge } from 'Interfaces/Edge';

declare namespace ISearchTree {
    export interface IProps {
        width: number;
        height: number;
        nodeList: Node[];
        edgeList: Edge[];
    }
}

export { ISearchTree };