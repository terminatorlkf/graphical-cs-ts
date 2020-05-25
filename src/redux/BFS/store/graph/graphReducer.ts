import * as graphAction from "./graphActionType";
import { graphActionType } from './graphActionType';
import { presetNodeState, defaultFill } from './PresetValues/PresetNodeState';
import { presetEdges } from './PresetValues/presetEdges';
import { nodeListStateInterface } from "./Interfaces/nodeListStateInterface";
import { EdgeListInterface } from "./Interfaces/EdgeListInterface";

export interface graphStateInterface {
    nodeList: nodeListStateInterface[],
    edgeList: EdgeListInterface[],
    currentNodeIndex: number,
    currentNeighborIndex: number,
    editNeighborMode: boolean,
    addNeighborMode: boolean,
    clickedFill: string,
    defaultFill: string
}

const initialGraphState: graphStateInterface = {
    nodeList: presetNodeState,
    edgeList: presetEdges,
    currentNodeIndex: -1,
    currentNeighborIndex: -1,
    editNeighborMode: false,
    addNeighborMode: false,
    defaultFill: defaultFill,
    clickedFill: 'red'
}

const graphReducer = (state = initialGraphState, action: graphActionType): graphStateInterface => {
    let index = -1;
    let newNodeList:nodeListStateInterface[] = [];
    let currentNeighborIndex = -1;
    let currentNodeIndex = -1;
    let newNode: nodeListStateInterface = state.nodeList[0];

    switch (action.type) {
        // Reducer to fire after adding a node
        case graphAction.ADD_NODE:
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
                        ref: null
                    }
                ]
            }

        // Reducer to fire after deleting a node
        case graphAction.DELETE_NODE:
            return {
                ...state,
                edgeList: state.edgeList.filter(edge => !(edge.edge[0] === (action as graphAction.deleteNodeAction).payload.index ||
                    edge.edge[1] === (action as graphAction.deleteNodeAction).payload.index)),
            };

        // Reducer to fire after clicking on a node
        case graphAction.CLICK_NODE:
            newNodeList = [...state.nodeList];
            const clickedFill = state.clickedFill;
            const defaultFill = state.defaultFill;
            index = (action as graphAction.clickNodeAction).payload.index;
            newNode = { ...newNodeList[index] }
            newNode.fill = newNode.fill === defaultFill ? clickedFill : defaultFill;

            // make all other nodes besides the current clicked node the default color
            for (let i = 0; i < newNodeList.length; i++) {
                if (i !== index && newNodeList[i].fill === clickedFill) {
                    let oldNode = { ...newNodeList[i] };
                    oldNode.fill = defaultFill;
                    newNodeList[i] = oldNode;
                }
            }

            newNodeList[index] = newNode;

            if (newNode.fill === clickedFill) {
                return {
                    ...state,
                    currentNodeIndex: index,
                    addNeighborMode: false,
                    nodeList: newNodeList
                }
            } else {
                //unclick the current node if it was clicked before
                return {
                    ...state,
                    currentNodeIndex: -1,
                    nodeList: newNodeList.slice()
                }
            }

        // Reducer to fire while dragging a node
        case graphAction.DRAG_NODE:
            index = (action as graphAction.dragNodeAction).payload.index;
            const event = (action as graphAction.dragNodeAction).payload.e;
            newNodeList = [...state.nodeList];

            newNode = { ...newNodeList[index] };
            newNode = {
                ...newNode,
                xPosition: event.target.x(),
                yPosition: event.target.y()
            }

            newNodeList[index] = newNode;

            return {
                ...state,
                nodeList: newNodeList.slice()
            }

        case graphAction.MOUSE_ENTER_NODE:
            newNodeList = [...state.nodeList];
            index = (action as graphAction.mouseEnterNodeAction).payload.index;
            let ref = (action as graphAction.mouseEnterNodeAction).payload.ref;
            newNode = { ...newNodeList[index] };
            newNode.ref = ref;
            newNodeList[index] = newNode;

            return {
                ...state,
                nodeList: newNodeList.slice()
            }

        case graphAction.MOUSE_LEAVE_NODE:
            index = (action as graphAction.mouseLeaveNodeAction).payload.index;
            newNodeList = [...state.nodeList];
            newNode = { ...newNodeList[index] };
            newNode.ref = null;
            newNodeList[index] = newNode;

            return {
                ...state,
                nodeList: newNodeList.slice()
            }

        case graphAction.CLICK_EXISTING_NEIGHBOR:
            const neighborIndex = (action as graphAction.clickExistingNeighborAction).payload.neighborIndex;
            currentNeighborIndex = state.currentNeighborIndex;
            if (currentNeighborIndex === -1)
                return {
                    ...state,
                    currentNeighborIndex: neighborIndex,
                    editNeighborMode: true
                }
            else if (neighborIndex === currentNeighborIndex)
                return {
                    ...state,
                    currentNeighborIndex: -1,
                    editNeighborMode: false
                }
            else
                return {
                    ...state,
                    currentNeighborIndex: neighborIndex
                }


        case graphAction.CLICK_AVAILABLE_NEIGHBOR:
            let i = -1;
            currentNeighborIndex = (action as graphAction.clickAvailableNeighborAction).payload.index;
            currentNodeIndex = state.currentNodeIndex;

            if (state.edgeList.length === 0) i = 0;
            else i = state.edgeList[state.edgeList.length - 2].key + 2;

            return {
                ...state,
                edgeList: [
                    ...state.edgeList,
                    {
                        key: i,
                        edge: [currentNodeIndex, currentNeighborIndex]
                    }
                ]
            }

        case graphAction.DELETE_NEIGHBOR:
            index = (action as graphAction.deleteNeighborAction).payload.index;
            currentNodeIndex = state.currentNodeIndex;
            let newEdgeList = { ...state.edgeList };

            if (currentNeighborIndex !== -1) {
                newEdgeList = state.edgeList.filter(edge => {
                    return !((edge.edge[0] === index && edge.edge[1] === currentNodeIndex) ||
                        (edge.edge[0] === currentNodeIndex && edge.edge[1] === index));
                });
            }

            return { 
                ...state,
                edgeList: newEdgeList,
                editNeighborMode: false
            }

        case graphAction.ADD_NEIGHBOR:
            return {
                ...state,
                addNeighborMode: !state.addNeighborMode
            }
            
        default:
            return state
    }
}

export default graphReducer;