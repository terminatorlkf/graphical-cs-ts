import { GraphState } from 'Interfaces/GraphState';
import { graphActionType } from '../../graphActionType';
import * as graphAction from "../../graphActionType";

export const setVisitedNode = (state: GraphState, action: graphActionType) => {

    const nodeAndAction = (action as graphAction.setVisitedNodeAction).payload.nodeAndAction;
    const newNodeList = { ...state.nodeList };

    const actualNodeIndex = nodeAndAction.actualNodeIndex;
    const visited = nodeAndAction.visited;
    newNodeList.forEach((newNode, index) => {
        if (newNode.index === actualNodeIndex) {
            newNodeList[index] = {
                ...newNode,
                visited
            }
        }
    });

    const newState = {
        ...state,
        nodeList: newNodeList
    }

    return newState;
}