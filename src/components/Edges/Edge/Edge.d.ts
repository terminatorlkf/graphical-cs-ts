import { NodeList } from '@Interfaces/NodeList';

declare namespace IEdge {
    export interface IProps {
        edge: number[],
        nodeListState: NodeList[]
    }
}

export { IEdge }; 