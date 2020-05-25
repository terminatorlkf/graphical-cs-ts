import * as graphActionType from './graphActionType';
import { KonvaEventObject } from 'konva/types/Node';
import Konva from 'konva';

export const addNode = (x: number, y: number, defaultFill: string): graphActionType.addNodeAction => {
    return {
        type: graphActionType.ADD_NODE,
        payload: { x, y, defaultFill }
    }
}

export const deleteNode = (index: number): graphActionType.deleteNodeAction => {
    return {
        type: graphActionType.DELETE_NODE,
        payload: { index }
    }
}

export const clickNode = (index: number): graphActionType.clickNodeAction => {
    return {
        type: graphActionType.CLICK_NODE,
        payload: { index }
    }
}

export const dragNode = (index: number, e: KonvaEventObject<DragEvent>): graphActionType.dragNodeAction => {
    return {
        type: graphActionType.DRAG_NODE,
        payload: { index, e }
    }
}

export const mouseEnterNodeHandler = (index: number, ref: React.MutableRefObject<Konva.Circle>): graphActionType.mouseEnterNodeAction => {
    return {
        type: graphActionType.MOUSE_ENTER_NODE,
        payload: { index, ref }
    }
}

export const mouseLeaveNodeHandler = (index: number): graphActionType.mouseLeaveNodeAction => {
    return {
        type: graphActionType.MOUSE_LEAVE_NODE,
        payload: { index }
    }
}

export const clickExistingNeighbor = (nodeIndex: number, neighborIndex: number): graphActionType.clickExistingNeighborAction => {
    return {
        type: graphActionType.CLICK_EXISTING_NEIGHBOR,
        payload: { neighborIndex }
    }
}

export const clickAvailableNeighbor = (index: number): graphActionType.clickAvailableNeighborAction => {
    return {
        type: graphActionType.CLICK_AVAILABLE_NEIGHBOR,
        payload: { index }
    }
}

export const deleteNeighbor = (index: number): graphActionType.deleteNeighborAction => {
    return {
        type: graphActionType.DELETE_NEIGHBOR,
        payload: { index }
    }
}