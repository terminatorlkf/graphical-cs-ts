import { EdgeList } from './EdgeList';
import { NodeList } from './NodeList';
import { SearchTrack } from './SearchTrack';

export interface GraphState {
    nodeList: NodeList[],
    edgeList: EdgeList[],
    currentNodeIndex: number,
    currentNeighborIndex: number,
    editNeighborMode: boolean,
    addNeighborMode: boolean,
    clickedFill: string,
    defaultFill: string,
    nodeStatusCardToggled: boolean
    rootNodeIndex: number,
    destinationNodeIndex: number
    rootFill: string,
    destinationFill: string,
    searchMode: boolean,
    searchTrack: SearchTrack | undefined
}