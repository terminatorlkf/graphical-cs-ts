import Konva from 'konva';

export interface Node {
    index: number;
    value: number,
    elevation: number,
    className: string,
    xPosition: number,
    yPosition: number,
    fill: string,
    ref: React.MutableRefObject<Konva.Circle> | null,
    neighborList: number[]
}