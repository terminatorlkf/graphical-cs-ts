import { GraphState } from "Interfaces/GraphState";

export const deleteNeighbor = (state: GraphState) => {
    let currentNeighborIndex = state.currentNeighborIndex;
    let currentNodeIndex = state.currentNodeIndex;
    let newEdgeList = [...state.edgeList];

    if (currentNeighborIndex !== -1) {
        newEdgeList = newEdgeList.filter(edge => {
            return !((edge.edge[0] === currentNeighborIndex && edge.edge[1] === currentNodeIndex) ||
                (edge.edge[0] === currentNodeIndex && edge.edge[1] === currentNeighborIndex));
        });
    }

    let newNodeList = [...state.nodeList];

    let newNode = { ...newNodeList[currentNodeIndex] };
    newNode.neighborList = newNode.neighborList.filter(neighborIndex => neighborIndex !== newNodeList[currentNeighborIndex].index);

    let newNode2 = { ...newNodeList[currentNeighborIndex] };
    newNode2.neighborList = newNode2.neighborList.filter(neighborIndex => neighborIndex !== newNodeList[currentNodeIndex].index);

    newNodeList[currentNodeIndex] = newNode;
    newNodeList[currentNeighborIndex] = newNode2;

    return {
        ...state,
        nodeList: newNodeList,
        edgeList: newEdgeList,
        editNeighborMode: false,
        currentNeighborIndex: -1,
        lastDeletedNode: undefined
    }
}