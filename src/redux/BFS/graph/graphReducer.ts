import * as graphAction from "./graphActionType";
import { graphActionType } from './graphActionType';
import { presetNodeState, defaultFill } from './PresetValues/PresetNodeState';
import { presetEdges } from './PresetValues/presetEdges';
import { Node } from "../../../Interfaces/Node";
import { GraphState } from '../../../Interfaces/GraphState';
import { bfsSearch, addNode, deleteNode, addNeighbor, setVisitedNode, deleteNeighbor } from './methods';

const initialGraphState: GraphState = {
    nodeList: presetNodeState,
    edgeList: presetEdges,
    searchAlgorithms: ['Breadth-First Search', 'Depth-First Search', 'Iterative Deepening', 'A* Search'],
    currentSearchAlgorithm: 0,
    currentNodeIndex: -1,
    currentNeighborIndex: -1,
    editNeighborMode: false,
    addNeighborMode: false,
    defaultFill: defaultFill,
    clickedFill: '#cf0a4f',
    nodeStatusCardToggled: false,
    rootNodeIndex: 0,
    destinationNodeIndex: 1,
    rootFill: '#4CAF50',
    destinationFill: '#D32F2F',
    searchMode: false,
    searchTrack: { parentTrackList: [], path: [] },
    updateNodePositionMode: false,
    lastDeletedNode: undefined
}

const graphReducer = (state = initialGraphState, action: graphActionType): GraphState => {
    let index = -1;
    let newNodeList: Node[] = [];
    let currentNeighborIndex = -1;
    let newNode: Node = state.nodeList[0];

    switch (action.type) {
        // Reducer to fire after adding a node
        case graphAction.ADD_NODE: return addNode(state, action);

        // Reducer to fire after deleting a node
        case graphAction.DELETE_NODE: return deleteNode(state);

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
                    nodeList: newNodeList,
                    currentNeighborIndex: -1,
                    nodeStatusCardToggled: true
                }
            } else {
                //unclick the current node if it was clicked before
                return {
                    ...state,
                    nodeStatusCardToggled: false,
                    addNeighborMode: false,
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

        case graphAction.ADD_NEIGHBOR: return addNeighbor(state, action);

        case graphAction.DELETE_NEIGHBOR: return deleteNeighbor(state);

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

        case graphAction.SET_VISITED_NODE: return setVisitedNode(state, action);

        default:
            return state
    }
}

export default graphReducer;