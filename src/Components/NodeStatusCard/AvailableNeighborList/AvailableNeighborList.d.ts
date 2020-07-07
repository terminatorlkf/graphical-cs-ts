import { Node } from '../../../Interfaces/Node';
import { Edge } from '../../../Interfaces/Edge';

declare namespace IAvailableNeighborList {
    export interface IProps {
        expanded: boolean,
        nodeList: Node[],
        edgeList: Edge[],
        currentNodeIndex: number
        onMouseEnter: (index: number) => void,
        onMouseLeave: (index: number) => void
    }
}

export { IAvailableNeighborList };