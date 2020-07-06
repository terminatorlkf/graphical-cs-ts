import { NodeList } from '../../../Interfaces/NodeList';
import { EdgeList } from '../../../Interfaces/EdgeList';

declare namespace IAvailableNeighborList {
    export interface IProps {
        expanded: boolean,
        nodeList: NodeList[],
        edgeList: EdgeList[],
        currentNodeIndex: number
        onMouseEnter: (index: number) => void,
        onMouseLeave: (index: number) => void
    }
}

export { IAvailableNeighborList };