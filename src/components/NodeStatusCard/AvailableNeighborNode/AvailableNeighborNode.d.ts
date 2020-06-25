declare namespace IAvailableNeighborNode {
    export interface IProps {
        index: number,
        value: number,
        onMouseEnter: (index: number) => void,
        onMouseLeave: (index: number) => void,
        onClick: (index: number) => void 
    }
}

export { IAvailableNeighborNode };