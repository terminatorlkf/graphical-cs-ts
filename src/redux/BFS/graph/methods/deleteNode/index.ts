import { GraphState } from "Interfaces/GraphState";
import { graphActionType } from '../../graphActionType';
import * as graphAction from '../../graphActionType';

export const deleteNode = (state: GraphState, action: graphActionType) => {
    const edgeList = state.edgeList;
    const nodeList = state.nodeList;
    const currentNodeIndex = state.currentNodeIndex;

    const actualCurrentNodeIndex = nodeList[currentNodeIndex].index;
    const newNodeList = nodeList.filter(node => node.index !== actualCurrentNodeIndex);
    const newEdgeList = edgeList.filter(edge => edge.edge[0] !== actualCurrentNodeIndex && edge.edge[1] !== actualCurrentNodeIndex);

    return { 
        ...state,
        nodeList: newNodeList,
        edgeList: newEdgeList,
        lastDeletedNode: nodeList[currentNodeIndex],
        currentNodeIndex: -1,
        nodeStatusCardToggled: false,
        editNeighborMode: false
    }

}