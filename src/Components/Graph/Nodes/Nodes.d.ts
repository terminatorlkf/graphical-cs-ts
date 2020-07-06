import { KonvaEventObject } from 'konva/types/Node';

declare namespace INodes {
    export interface IProps {
        index: number,
        value: number,
        elevation: number,
        xPosition: number,
        yPosition: number,
        fill: string,
        onClick: () => void,
        onMouseEnter: () => void,
        onMouseLeave: () => void,
        onDragMove: (e: KonvaEventObject<DragEvent>) => void
    }
}

export { INodes };