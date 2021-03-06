import { Edge } from './Edge';
import { Node } from './Node';
import { SearchTrack } from './SearchTrack';

export interface GraphState {
    nodeList: Node[],
    edgeList: Edge[],
    searchAlgorithms: string[],
    currentSearchAlgorithm: number,
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
    searchTrack: SearchTrack,
    updateNodePositionMode: boolean,
    lastDeletedNode: Node | undefined
}