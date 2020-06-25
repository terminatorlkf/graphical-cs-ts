declare namespace INodeStatusTitle {
    export interface IProps { 
        currentNodeIndex: number,
        backgroundColor: string,
        editNeighborMode: boolean,
        addNeighborMode: boolean,
        onAddNeighbor: () => void,
        onDeleteNeighbor: () => void
    }
}

export { INodeStatusTitle };