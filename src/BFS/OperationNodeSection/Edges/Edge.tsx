import React, { FunctionComponent } from 'react';
import { Line } from 'react-konva';
import { nodeListStateInterface } from '../../../redux/BFS/store/graph/Interfaces/nodeListStateInterface';

interface EdgeInterface {
    edge: number[],
    nodeListState: nodeListStateInterface[]
}

const Edge: FunctionComponent<EdgeInterface> = ({ edge, nodeListState }) => {
    let locationVector;
    if (nodeListState[edge[0]] && nodeListState[edge[1]]) {
        const x1 = nodeListState[edge[0]].xPosition;
        const y1 = nodeListState[edge[0]].yPosition;
        const x2 = nodeListState[edge[1]].xPosition;
        const y2 = nodeListState[edge[1]].yPosition;
        locationVector = [x1, y1, x2, y2];
    }

    return (
        <React.Fragment>
            {locationVector &&
                <Line
                    points={locationVector}
                    stroke='black'
                    strokeWidth={4}
                />
            }
        </React.Fragment>
    )
}

export default Edge;