export interface GraphState {
    nodeList: nodeListStateInterface[],
    edgeList: EdgeListInterface[],
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
    destinationFill: string
}