import Konva from 'konva';

export interface nodeListStateInterface {
    value: number,
    elevation: number,
    className: string,
    xPosition: number,
    yPosition: number,
    fill: string,
    ref: React.MutableRefObject<Konva.Circle> | null,
    neighbor: nodeListStateInterface[] | null
}