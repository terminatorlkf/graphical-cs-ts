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
        let currentNodeIndex = currentNodePath[currentNodePath.length - 1];
        let curretnNeighborList = nodeList[currentNodeIndex].neighborList;
        if (currentNodeIndex === dest)
            return {
                ...state,
                searchTrack: { parentTrackList: parentTrackList, path: currentNodePath }
            };
        if (visited.includes(currentNodeIndex)) continue;
        visited.push(currentNodeIndex);
        parentTrackList.push({ parentNodeIndex: currentNodeIndex, searchedNeighbor: [...curretnNeighborList] });
        curretnNeighborList.forEach(nodeIndex => {
            queue.enqueue([...currentNodePath, nodeIndex]);
        });
    }

    return state;
}