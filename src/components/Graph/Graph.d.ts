import { KonvaEventObject } from 'konva/types/Node';

declare namespace IGraph {
    export interface IProps {
        onMouseEnter: (index: number) => void,
        onMouseLeave: (index: number) => void,
        onDragMove: (index: number, e: KonvaEventObject<DragEvent>) => void
    }
}

export { IGraph };