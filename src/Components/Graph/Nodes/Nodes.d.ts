import { KonvaEventObject } from 'konva/types/Node';
import { Node } from 'Interfaces/Node';

declare namespace INodes {
    export interface IProps {
        nodeList: Node[];
        onClick?: () => void,
        onMouseEnter?: () => void,
        onMouseLeave?: () => void,
        onDragMove?: (e: KonvaEventObject<DragEvent>) => void
    }
}

export { INodes };