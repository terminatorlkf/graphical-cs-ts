import { GraphState } from "Interfaces/GraphState";

export const deleteNode = (state: GraphState) => {
    const edgeList = state.edgeList;
    const nodeList = state.nodeList;
    const currentNodeIndex = state.currentNodeIndex;

    const actualCurrentNodeIndex = nodeList[currentNodeIndex].index;

    let newNodeList = [ ...nodeList ]

    nodeList[currentNodeIndex].neighborList.forEach(actualNeighborIndex => {
        let neighborIndex = -1;
        nodeList.forEach((node, index) => {
            if (node.index === actualNeighborIndex) neighborIndex = index;
        });

        let newNeighborNode = { ...nodeList[neighborIndex] };
        newNeighborNode.neighborList = newNeighborNode.neighborList.filter(actualIndex => actualIndex !== actualCurrentNodeIndex);
        newNodeList[neighborIndex] = newNeighborNode;
    });

    newNodeList = newNodeList.filter(node => node.index !== actualCurrentNodeIndex);

    const newEdgeList = edgeList.filter(edge => edge.edge[0] !== actualCurrentNodeIndex && edge.edge[1] !== actualCurrentNodeIndex);

    const rootNodeIndex = state.rootNodeIndex === actualCurrentNodeIndex ? -1 : state.rootNodeIndex;
    const destinationNodeIndex = state.destinationNodeIndex === actualCurrentNodeIndex ? -1 : state.destinationNodeIndex;

    return {
        ...state,
        nodeList: newNodeList,
        edgeList: newEdgeList,
        lastDeletedNode: nodeList[currentNodeIndex],
        currentNodeIndex: -1,
        nodeStatusCardToggled: false,
        editNeighborMode: false,
        rootNodeIndex,
        destinationNodeIndex
    }

}