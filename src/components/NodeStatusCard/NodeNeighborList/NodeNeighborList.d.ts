import { NodeList } from '../../../Interfaces/NodeList';
import { EdgeListInterface } from '../../../Interfaces/EdgeList';

declare namespace INodeNeighborList {
    export interface IProps {
        edgeList: EdgeListInterface[],
        nodeList: NodeList[],
        currentNodeIndex: number,
        onMouseEnter: (index: number) => void,
        onMouseLeave: (index: number) => void
    }
}

export { INodeNeighborList };