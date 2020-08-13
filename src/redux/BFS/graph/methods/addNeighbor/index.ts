import { GraphState } from 'Interfaces/GraphState';
import { graphActionType } from '../../graphActionType';
import * as graphAction from '../../graphActionType';

export const addNeighbor = (state: GraphState, action: graphActionType) => {
    let i = -1;
    let actualCurrentNeighborIndex = (action as graphAction.clickAvailableNeighborAction).payload.index;
    let currentNodeIndex = state.currentNodeIndex;
    let actualCurrentNodeIndex = state.nodeList[currentNodeIndex].index;

    if (state.edgeList.length === 0 || state.edgeList.length === 1) i = state.edgeList.length;
    else i = state.edgeList[state.edgeList.length - 2].key + 2;

    let newNodeList = [...state.nodeList];

    let newNode = { ...newNodeList[currentNodeIndex] };
    newNode.neighborList = [...newNode.neighborList, actualCurrentNeighborIndex];

    let node2Index = -1;

    state.nodeList.forEach((node, index) => {
        if (node.index === actualCurrentNeighborIndex) node2Index = index;
    });

    let newNode2 = { ...newNodeList[node2Index] };
    newNode2.neighborList = [...newNode2.neighborList, actualCurrentNodeIndex];

    newNodeList[currentNodeIndex] = newNode;
    newNodeList[node2Index] = newNode2;

    return {
        ...state,
        nodeList: newNodeList,
        edgeList: [
            ...state.edgeList,
            {
                key: i,
                edge: [actualCurrentNodeIndex, actualCurrentNeighborIndex]
            }
        ]
    }
}