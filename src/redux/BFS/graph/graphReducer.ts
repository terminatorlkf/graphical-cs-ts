import * as graphAction from "./graphActionType";
import { graphActionType } from './graphActionType';
import { presetNodeState, defaultFill } from './PresetValues/PresetNodeState';
import { presetEdges } from './PresetValues/presetEdges';
import { Node } from "../../../Interfaces/Node";
import { Edge } from '../../../Interfaces/Edge'; 
import { GraphState } from '../../../Interfaces/GraphState';
import { bfsSearch, addNode } from './methods';

const initialGraphState: GraphState = {
    nodeList: [],
    edgeList: [],
    currentNodeIndex: -1,
    currentNeighborIndex: -1,
    editNeighborMode: false,
    addNeighborMode: false,
    defaultFill: defaultFill,
    clickedFill: '#cf0a4f',
    nodeStatusCardToggled: false,
    rootNodeIndex: -1,
    destinationNodeIndex: -1,
    rootFill: '#51df0f',
    destinationFill: '#df9d0f',
    searchMode: false,
    searchTrack: { parentTrackList: [], path: [] },
    updateNodePositionMode: false,
}

const graphReducer = (state = initialGraphState, action: graphActionType): GraphState => {
    let index = -1;
    let newNodeList: Node[] = [];
    let currentNeighborIndex = -1;
    let currentNodeIndex = -1;
    let newNode: Node = state.nodeList[0];
    let newEdgeList: Edge[] = [];

    switch (action.type) {
        // Reducer to fire after adding a node
        case graphAction.ADD_NODE: return addNode(state, action);

        // Reducer to fire after deleting a node
        case graphAction.DELETE_NODE:
            newEdgeList = state.edgeList.filter(edge => {
                let firstIndex = 0;
                let secondIndex = 0;


            });

            return {
                ...state,
                edgeList: state.edgeList.filter(edge => !(edge.edge[0] === state.currentNodeIndex ||
                    edge.edge[1] === state.currentNodeIndex)),
                nodeList: state.nodeList.filter((node, index) => index !== (action as graphAction.deleteNodeAction).payload.index),
                currentNodeIndex: -1,
                editNeighborMode: false,
                nodeStatusCardToggled: false
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
                nodeList: newNodeList.slice(),
            }

        case graphAction.MOUSE_LEAVE_NODE:
            index = (action as graphAction.mouseLeaveNodeAction).payload.index;
            newNodeList = [...state.nodeList];
            newNode = { ...newNodeList[index] };
            newNode.ref = null;
            newNodeList[index] = newNode;

            return {
                ...state,
                nodeList: newNodeList.slice(),
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

        case graphAction.ADD_NEIGHBOR:
            let i = -1;
            currentNeighborIndex = (action as graphAction.clickAvailableNeighborAction).payload.index;
            currentNodeIndex = state.currentNodeIndex;

            if (state.edgeList.length === 0 || state.edgeList.length === 1) i = state.edgeList.length;
            else i = state.edgeList[state.edgeList.length - 2].key + 2;
            newNodeList = [...state.nodeList];
            newNode = { ...newNodeList[currentNodeIndex] };

            newNode.neighborList = [...newNode.neighborList, currentNeighborIndex];

            newNodeList[currentNodeIndex] = newNode;
            let actualCurrentNodeIndex = state.nodeList[currentNodeIndex].index;

            return {
                ...state,
                nodeList: newNodeList,
                edgeList: [
                    ...state.edgeList,
                    {
                        key: i,
                        edge: [actualCurrentNodeIndex, currentNeighborIndex]
                    }
                ]
            }

        case graphAction.DELETE_NEIGHBOR:
            currentNeighborIndex = state.currentNeighborIndex;
            currentNodeIndex = state.currentNodeIndex;
            newEdgeList = [...state.edgeList];

            if (currentNeighborIndex !== -1) {
                newEdgeList = newEdgeList.filter(edge => {
                    return !((edge.edge[0] === currentNeighborIndex && edge.edge[1] === currentNodeIndex) ||
                        (edge.edge[0] === currentNodeIndex && edge.edge[1] === currentNeighborIndex));
                });
            }

            newNodeList = [...state.nodeList];
            newNode = { ...newNodeList[currentNodeIndex] };

            newNode.neighborList = newNode.neighborList.filter(neighborIndex => neighborIndex !== currentNeighborIndex);

            newNodeList[currentNodeIndex] = newNode;

            return {
                ...state,
                nodeList: newNodeList,
                edgeList: newEdgeList,
                editNeighborMode: false,
                currentNeighborIndex: -1
            }

        case graphAction.TOGGLE_ADD_NEIGHBOR:
            return {
                ...state,
                addNeighborMode: !state.addNeighborMode
            }

        case graphAction.SET_ROOT:
            index = (action as graphAction.setRootAction).payload.index;
            return {
                ...state,
                rootNodeIndex: index
            }

        case graphAction.SET_DESTINATION:
            index = (action as graphAction.setDestinationAction).payload.index;
            return {
                ...state,
                destinationNodeIndex: index
            }

        case graphAction.TOGGLE_SEARCH_MODE:
            return {
                ...state,
                searchMode: !state.searchMode
            }

        case graphAction.START_BFS_SEARCH:
            return bfsSearch(state)

        case graphAction.TOGGLE_UPDATE_NODE_POSITION_MODE:
            const isOn = (action as graphAction.toggleUpdateNodePositionModeAction).payload.isOn;
            return {
                ...state,
                updateNodePositionMode: isOn
            }

        default:
            return state
    }
}

export default graphReducer;