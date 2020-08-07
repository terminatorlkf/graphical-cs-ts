import { GraphState } from "Interfaces/GraphState";
import { graphActionType } from '../../graphActionType';
import * as graphAction from '../../graphActionType';

export const addNode = (state: GraphState, action: graphActionType): GraphState => {
    const nodeList = state.nodeList;

    if (nodeList[nodeList.length - 1].index > nodeList.length - 1) {
        console.log('has gap');
        let latestIndex = 0;

        for (let i = 0; i < nodeList.length; i++) {
            if (i + 1 < nodeList.length && nodeList[i].index + 1 !== nodeList[i + 1].index) {
                latestIndex = nodeList[i].index + 1;
            }
        }

        let newNodeList = [
            ...state.nodeList,
            {
                index: latestIndex,
                value: latestIndex,
                elevation: 5,
                className: "",
                xPosition: (action as graphAction.addNodeAction).payload.x,
                yPosition: (action as graphAction.addNodeAction).payload.y,
                fill: state.defaultFill,
                ref: null,
                neighborList: []  
            }
        ];

        newNodeList.sort((a, b) => {
            if (a.index < b.index) return -1;
            if (a.index > b.index) return 1;
            return 0;
        });

        return { 
            ...state,
            nodeList: newNodeList
        }
    }

    return { 
        ...state,
        nodeList: [
            ...state.nodeList,
            {
                index: state.nodeList.length,
                value: state.nodeList.length,
                elevation: 5,
                className: "",
                xPosition: (action as graphAction.addNodeAction).payload.x,
                yPosition: (action as graphAction.addNodeAction).payload.y,
                fill: state.defaultFill,
                ref: null,
                neighborList: []
            }
        ],
    }
}