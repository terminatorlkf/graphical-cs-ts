import { Node } from 'Interfaces/Node';
import { Edge } from 'Interfaces/Edge';
import { GraphState } from 'Interfaces/GraphState';

declare namespace IEdges {
    export interface IProps {
        nodeList: Node[];
        edgeList: Edge[];
        graph?: GraphState;
    }
}

export { IEdges };