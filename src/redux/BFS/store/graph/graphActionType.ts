import { KonvaEventObject } from "konva/types/Node";
import Konva from "konva";

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

export type graphActionType = addNodeAction | deleteNodeAction | clickNodeAction |
    dragNodeAction | mouseEnterNodeAction | mouseLeaveNodeAction | clickExistingNeighborAction
    | clickAvailableNeighborAction | deleteNodeAction | deleteNeighborAction | addNeighborAction;