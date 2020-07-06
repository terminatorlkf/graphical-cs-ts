declare namespace INodeStatusCard {
    export interface IProps {
        onMouseEnterNeighbor: (index: number) => void,
        onMouseLeaveNeighbor: (index: number) => void,
        onMouseEnterAvailableNeighbor: (index: number) => void,
        onMouseLeaveAvailableNeighbor: (index: number) => void
    }
}

export { INodeStatusCard };