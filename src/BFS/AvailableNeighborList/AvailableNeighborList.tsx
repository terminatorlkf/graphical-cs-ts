import React from 'react';
import AvailableNeighborNode from './AvailableNeighborNode';
import { nodeListStateInterface } from '../nodeListStateInterface';
import SmoothCollapse from 'react-smooth-collapse';

export type AvailableNeighborListProps = {
    expanded: boolean,
    nodeList: nodeListStateInterface[],
    edgeList: number[][],
    currentNodeIndex: number
    onMouseEnter: (index: number) => void,
    onMouseLeave: (index: number) => void,
    onClick: (index: number) => void
}

const AvailableNeighborList = (props: AvailableNeighborListProps) => {
    const { expanded, nodeList, edgeList, currentNodeIndex, onMouseEnter, onMouseLeave, onClick} = props;

    return (
        <React.Fragment>
            <SmoothCollapse allowOverflowWhenOpen expanded={expanded} className="neighbor-list-collapse-section">
                <div className="neighbor-list">
                    {nodeList.map((node, index) => {
                        let isNeighbor = true;
                        if (node.value === currentNodeIndex)
                            isNeighbor = false;

                        edgeList.map(nodePair => {
                            if ((nodePair[0] === nodeList[currentNodeIndex].index && nodePair[1] === node.index) ||
                                (nodePair[1] === nodeList[currentNodeIndex].index && nodePair[0] === node.index)) {
                                isNeighbor = false;
                            }
                        })

                        if (isNeighbor) {
                            return (
                                <AvailableNeighborNode 
                                    index={index}
                                    value={node.value}
                                    onMouseEnter={onMouseEnter}
                                    onMouseLeave={onMouseLeave}
                                    onClick={onClick}
                                />
                            )
                        }
                    })}
                </div>
            </SmoothCollapse>
        </React.Fragment>
    );
}

export default AvailableNeighborList;