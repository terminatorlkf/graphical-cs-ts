import React from 'react';
import AvailableNeighborNode from './AvailableNeighborNode';
import { nodeListStateInterface } from '../../Interfaces/nodeListStateInterface';
import { EdgeListInterface } from '../../Interfaces/EdgeListInterface';
import SmoothCollapse from 'react-smooth-collapse';

export type AvailableNeighborListProps = {
    expanded: boolean,
    nodeList: nodeListStateInterface[],
    edgeList: EdgeListInterface[],
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
                        if (node.index !== -1) {
                            let isNeighbor = true;
                            if (node.value === currentNodeIndex)
                                isNeighbor = false;
    
                            edgeList.map(nodePair => {
                                if ((nodePair.edge[0] === nodeList[currentNodeIndex].index && nodePair.edge[1] === node.index) ||
                                    (nodePair.edge[1] === nodeList[currentNodeIndex].index && nodePair.edge[0] === node.index)) {
                                    isNeighbor = false;
                                }
                                return null;
                            })
    
                            if (isNeighbor) {
                                return (
                                    <AvailableNeighborNode 
                                        key={index}
                                        index={index}
                                        value={node.value}
                                        onMouseEnter={onMouseEnter}
                                        onMouseLeave={onMouseLeave}
                                        onClick={onClick}
                                    />
                                )
                            }
                        }
                    
                        return null;
                    })}
                </div>
            </SmoothCollapse>
        </React.Fragment>
    );
}

export default AvailableNeighborList;