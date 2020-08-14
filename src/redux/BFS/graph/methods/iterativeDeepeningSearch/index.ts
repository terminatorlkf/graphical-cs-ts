import { GraphState } from "Interfaces/GraphState";
import { ParentTrack } from "Interfaces/SearchTrack";
import { Stack } from 'stack-typescript';
import { type } from "os";
import { parentTrack } from "Components";
import { Path } from "react-konva";

const MAX_DEPTH = 10; //To be replaced: include max_depth in GraphState data structure

type depthLimitedSearchArgs = {
    start: number,
    dest: number,
    depthLimit: number,
}

export const iterativeDeepeningSearch = (state: GraphState): GraphState => {
    const nodeList = state.nodeList;
    const start = state.rootNodeIndex;
    const dest = state.destinationNodeIndex;

    const max_depth = MAX_DEPTH; //To be changed

    const depthLimitedSearch = (arsg: depthLimitedSearchArgs): { parentTrackList: parentTrack[], path: number[] } => {
        let parentTrackList: ParentTrack[] = [];

        let queue = new Stack<number[]>();
        let visited: number[] = [];
        queue.push([start]);

        while (1) {
            let currentNodePath = queue.removeHead();

            if (!currentNodePath) {
                return { parentTrackList: parentTrackList, path: [] };
            } else {
                let actualCurrentNodeIndex = currentNodePath[currentNodePath.length - 1];
                let currentNodeIndex = -1;

                nodeList.forEach((node, index) => {
                    if (node.index === actualCurrentNodeIndex) currentNodeIndex = index;
                });

                let curretnNeighborList = currentNodeIndex !== -1 ? nodeList[currentNodeIndex].neighborList.filter(neighborIndex =>
                    !visited.includes(neighborIndex)
                ) : [];

                if (actualCurrentNodeIndex === dest)
                    return { parentTrackList: parentTrackList, path: currentNodePath };
                if (visited.includes(actualCurrentNodeIndex)) continue;
                visited.push(actualCurrentNodeIndex);
                parentTrackList.push({ parentNodeIndex: actualCurrentNodeIndex, searchedNeighbor: [...curretnNeighborList] });
                curretnNeighborList.forEach(nodeIndex => {
                    queue.push([...currentNodePath, nodeIndex]);
                });
            }

        }

        return state;
    }

    for (let depthLimit = 0; depthLimit < max_depth; depthLimit++) {
        const { parentTrackList, path } = depthLimitedSearch({ start, dest, depthLimit })
        if (path.length > 0) {
            return {
                ...state,
                searchTrack: { parentTrackList: parentTrackList, path: path }
            }
        }
    }