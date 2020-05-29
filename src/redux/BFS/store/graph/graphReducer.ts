import * as graphAction from "./graphActionType";
import { graphActionType } from './graphActionType';
import { presetNodeState, defaultFill } from './PresetValues/PresetNodeState';
import { presetEdges } from './PresetValues/presetEdges';
import { nodeListStateInterface } from "./Interfaces/nodeListStateInterface";
import { EdgeListInterface } from "./Interfaces/EdgeListInterface";
import EdgeStatusCard from "../../../../BFS/EdgeStatusCard/EdgeStatusCard";

export interface graphStateInterface {
    nodeList: nodeListStateInterface[],
    edgeList: EdgeListInterface[],
    currentNodeIndex: number,
    currentEdgeIndex: number,
    currentNeighborIndex: number,
    editNeighborMode: boolean,
    addNeighborMode: boolean,
    clickedFill: string,
    defaultFill: string,
    nodeStatusCardToggled: boolean,
    edgeStatusCardToggled: boolean
}

const initialGraphState: graphStateInterface = {
    nodeList: presetNodeState,
    edgeList: presetEdges,
    currentNodeIndex: -1,
    currentEdgeIndex: -1,
    currentNeighborIndex: -1,
    editNeighborMode: false,
    addNeighborMode: false,
    defaultFill: defaultFill,
    clickedFill: 'red',
    nodeStatusCardToggled: false,
    edgeStatusCardToggled: false
}

const graphReducer = (state = initialGraphState, action: graphActionType): graphStateInterface => {
    let index = -1;
    let edgeIndex = -1;
    let newNodeList: nodeListStateInterface[] = [];
    let newEdgeList: EdgeListInterface[] = [];
    let currentNeighborIndex = -1;
    let currentNodeIndex = -1;
    let currentEdgeIndex = -1;
    let newNode: nodeListStateInterface = state.nodeList[0];
    let newEdge: EdgeListInterface = state.edgeList[0];

    switch (action.type) {

        case graphAction.CLICK_EDGE:
            currentEdgeIndex = (action as graphAction.clickEdgeAction).payload.index;
            return {
                ...state,
                currentEdgeIndex: currentEdgeIndex,
                nodeStatusCardToggled: false,
                edgeStatusCardToggled: true
            }
        
        case graphAction.DELETE_EDGE:
            return {
                ...state,
                currentEdgeIndex: -1,
                edgeStatusCardToggled: false,
                nodeStatusCardToggled: false,
                edgeList: state.edgeList.filter((edge, index) => !(index === (action as graphAction.deleteEdgeAction).payload.index)),
            }

        case graphAction.MOUSE_ENTER_EDGE:
            newEdgeList = [...state.edgeList];
            edgeIndex = (action as graphAction.mouseEnterEdgeAction).payload.index;
            let edgeRef = (action as graphAction.mouseEnterEdgeAction).payload.ref;
            newEdge = {...newEdgeList[edgeIndex]};
            newEdge.ref = edgeRef;
            newEdgeList[edgeIndex] = newEdge;

            return {
                ...state,
                edgeList: newEdgeList.slice()
            }

        case graphAction.MOUSE_LEAVE_EDGE:
            edgeIndex = (action as graphAction.mouseLeaveEdgeAction).payload.index;
            newEdgeList = [...state.edgeList];
            newEdge = { ...newEdgeList[edgeIndex] };
            newEdge.ref = null;
            newEdgeList[edgeIndex] = newEdge;

            return {
                ...state,
                edgeList: newEdgeList.slice()
            }
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
                    edgeStatusCardToggled: false,
                    addNeighborMode: false,
                    nodeList: newNodeList,
                    currentNeighborIndex: -1,
                    nodeStatusCardToggled: true
                }
            } else {
                //unclick the current node if it was clicked before
                return {
                    ...state,
                    nodeStatusCardToggled: false,
                    // currentNodeIndex: -1,
                    edgeStatusCardToggled: false,
                    nodeList: newNodeList.slice(),
                    currentNeighborIndex: -1
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
                        edge: [currentNodeIndex, currentNeighborIndex],
                        ref: null
                    }
                ]
            }

        case graphAction.DELETE_NEIGHBOR:
            currentNeighborIndex = state.currentNeighborIndex;
            currentNodeIndex = state.currentNodeIndex;
            newEdgeList = [ ...state.edgeList ];

            if (currentNeighborIndex !== -1) {
                newEdgeList = newEdgeList.filter(edge => {
                    return !((edge.edge[0] === currentNeighborIndex && edge.edge[1] === currentNodeIndex) ||
                        (edge.edge[0] === currentNodeIndex && edge.edge[1] === currentNeighborIndex));
                });
            }

            return {
                ...state,
                edgeList: newEdgeList,
                editNeighborMode: false,
                currentNeighborIndex: -1
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