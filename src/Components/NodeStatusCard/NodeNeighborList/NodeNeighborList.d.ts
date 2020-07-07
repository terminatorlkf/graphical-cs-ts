import { Node } from '../../../Interfaces/Node';
import { EdgeListInterface } from '../../../Interfaces/Edge';

declare namespace INodeNeighborList {
    export interface IProps {
        edgeList: EdgeListInterface[],
        nodeList: Node[],
        currentNodeIndex: number,
        onMouseEnter: (index: number) => void,
        onMouseLeave: (index: number) => void
    }
}

export { INodeNeighborList };