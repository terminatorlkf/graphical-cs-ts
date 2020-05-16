import React from 'react';
import { Elevation } from '@rmwc/elevation';
import { nodeListStateInterface } from '../nodeListStateInterface';

import '@rmwc/elevation/styles';

export type NodeNeighborListProps = {
    neighborList: number[][],
    nodeList: nodeListStateInterface[],
    currentNodeIndex: number,
    onMouseEnter: (index: number) => void,
    onMouseLeave: (index: number) => void,
    onClick: (index: number) => void
}

const NodeNeighborList = (props: NodeNeighborListProps) => {
    const {neighborList, nodeList, currentNodeIndex, onMouseEnter, onMouseLeave, onClick} = props;

    return (
        <div className="neighbor-list">
            {neighborList.map((nodePair, index) => {
                let neighborNodeIndex = -1;
                if (nodePair[0] === nodeList[currentNodeIndex].index)
                    neighborNodeIndex = 1;

                if (nodePair[1] === nodeList[currentNodeIndex].index)
                    neighborNodeIndex = 0;

                if (neighborNodeIndex !== -1) {
                    let neighborNodeIndexOriginal = -1;

                    for (let i = 0; i < nodeList.length; i++) {
                        if (nodeList[i].index === nodePair[neighborNodeIndex])
                            neighborNodeIndexOriginal = i;
                    }

                    return (
                        <Elevation
                            key={index}
                            z={2}
                            className="neighbor-node"
                            onMouseEnter={() => onMouseEnter(neighborNodeIndexOriginal)}
                            onMouseLeave={() => onMouseLeave(neighborNodeIndexOriginal)}
                            onClick={() => {
                                onClick(neighborNodeIndexOriginal);
                            }}
                        >
                            <p>{nodePair[neighborNodeIndex]}</p>
                        </Elevation>
                    );
                }
            })
            }
        </div>
    );
}

export default NodeNeighborList;