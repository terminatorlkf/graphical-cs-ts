import { GraphState } from "Interfaces/GraphState";
import { ParentTrack } from "Interfaces/SearchTrack";
import { Queue } from 'queue-typescript';

export const bfsSearch = (state: GraphState): GraphState => {
    const nodeList = state.nodeList;
    const start = state.rootNodeIndex;
    const dest = state.destinationNodeIndex;

    let parentTrackList: ParentTrack[] = [];

    let queue = new Queue<number[]>();
    let visited: number[] = [];
    queue.enqueue([start]);

    while (1) {
        let currentNodePath = queue.dequeue();
        let actualCurrentNodeIndex = currentNodePath[currentNodePath.length - 1];
        let currentNodeIndex = -1;
        
        nodeList.forEach((node, index) => {
            if (node.index === actualCurrentNodeIndex) currentNodeIndex = index;
        });

        let curretnNeighborList = currentNodeIndex !== -1 ? nodeList[currentNodeIndex].neighborList.filter(neighborIndex =>
            !visited.includes(neighborIndex)
        ) : [];
        
        if (actualCurrentNodeIndex === dest)
            return {
                ...state,
                searchTrack: { parentTrackList: parentTrackList, path: currentNodePath }
            };
        if (visited.includes(actualCurrentNodeIndex)) continue;
        visited.push(actualCurrentNodeIndex);
        parentTrackList.push({ parentNodeIndex: actualCurrentNodeIndex, searchedNeighbor: [...curretnNeighborList] });
        curretnNeighborList.forEach(nodeIndex => {
            queue.enqueue([...currentNodePath, nodeIndex]);
        });
    }

    return state;
}