import Konva from 'konva';

export interface EdgeListInterface {
    key: number,
    edge: number[],
    ref: React.MutableRefObject<Konva.Line> | null
}