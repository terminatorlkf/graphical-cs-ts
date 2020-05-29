import { KonvaEventObject } from "konva/types/Node";
import Konva from "konva";

export const CLICK_EDGE = 'CLICK_EDGE';
export const DELETE_EDGE = 'DELETE_EDGE';
export const MOUSE_ENTER_EDGE = 'MOUSE_ENTER_EDGE';
export const MOUSE_LEAVE_EDGE = 'MOUSE_LEAVE_EDGE';

export const ADD_NODE = 'ADD_NODE';
export const DELETE_NODE = 'DELETE_NODE';
export const CLICK_NODE = 'CLICK_NODE';
export const DRAG_NODE = 'DRAG_NODE';

export const MOUSE_ENTER_NODE = 'MOUSE_ENTER_NODE';
export const MOUSE_LEAVE_NODE = 'MOUSE_LEAVE_NODE';

export const CLICK_EXISTING_NEIGHBOR = 'CLICK_EXISTING_NEIGHBOR'
export const CLICK_AVAILABLE_NEIGHBOR = 'CLICK_AVAILABLE_NEIGHBOR';
export const DELETE_NEIGHBOR = 'DELETE_NEIGHBOR';

export const ADD_NEIGHBOR = 'ADD_NEIGHBOR';

export interface deleteEdgeAction {
    type: typeof DELETE_EDGE,
    payload: { index: number}
}

export interface clickEdgeAction {
    type: typeof CLICK_EDGE,
    payload: { index: number }
}

export interface mouseEnterEdgeAction {
    type: typeof MOUSE_ENTER_EDGE,
    payload: {index: number, ref: React.MutableRefObject<Konva.Line>}
}

export interface mouseLeaveEdgeAction {
    type: typeof MOUSE_LEAVE_EDGE,
    payload: {index: number}
}

export interface addNodeAction {
    type: typeof ADD_NODE,
    payload: { x: number, y: number }
}

export interface deleteNodeAction {
    type: typeof DELETE_NODE,
    payload: { index: number }
}

export interface clickNodeAction {
    type: typeof CLICK_NODE,
    payload: { index: number }
}

export interface dragNodeAction {
    type: typeof DRAG_NODE,
    payload: { index: number, e: KonvaEventObject<DragEvent> }
}

export interface mouseEnterNodeAction {
    type: typeof MOUSE_ENTER_NODE,
    payload: { index: number, ref: React.MutableRefObject<Konva.Circle> }
}

export interface mouseLeaveNodeAction {
    type: typeof MOUSE_LEAVE_NODE,
    payload: { index: number }
}

export interface clickExistingNeighborAction {
    type: typeof CLICK_EXISTING_NEIGHBOR,
    payload: { neighborIndex: number }
}

export interface clickAvailableNeighborAction {
    type: typeof CLICK_AVAILABLE_NEIGHBOR,
    payload: { index: number }
}

export interface deleteNeighborAction {
    type: typeof DELETE_NEIGHBOR,
}

export interface addNeighborAction {
    type: typeof ADD_NEIGHBOR
}

export type graphActionType = clickEdgeAction | deleteEdgeAction | mouseEnterEdgeAction| mouseLeaveEdgeAction | addNodeAction | deleteNodeAction | clickNodeAction |
    dragNodeAction | mouseEnterNodeAction | mouseLeaveNodeAction | clickExistingNeighborAction
    | clickAvailableNeighborAction | deleteNodeAction | deleteNeighborAction | addNeighborAction;