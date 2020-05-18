import React from 'react';
import { Elevation } from '@rmwc/elevation';
import NodeStatusTitle from './NodeStatusTitle/NodeStatusTitle';
import NodeNeighborList from './NodeNeighborSection/NodeNeighborList';
import AvailableNeighborList from './AvailableNeighborList/AvailableNeighborList';
import { Button } from '@rmwc/button';
import { nodeListStateInterface } from '../Interfaces/nodeListStateInterface';
import { EdgeListInterface } from '../Interfaces/EdgeListInterface';

import '@rmwc/elevation/styles';
import '@rmwc/button/styles';

export type NodeStatusCardProps = {
    edgeList: EdgeListInterface[],
    nodeList: nodeListStateInterface[],
    currentNodeIndex: number,
    backgroundColor: string,
    editNeighborMode: boolean,
    addNeighborMode: boolean,
    currentNeighborIndex: number,
    expanded: boolean,
    onAddNeighbor: () => void,
    onDeleteNeighbor: (index: number) => void,
    onMouseEnterNeighbor: (index: number) => void,
    onMouseLeaveNeighbor: (index: number) => void,
    onClickNeighbor: (index: number) => void,
    onMouseEnterAvailableNeighbor: (index: number) => void,
    onMouseLeaveAvailableNeighbor: (index: number) => void,
    onClickAvailableNeighbor: (index: number) => void,
    onDeleteNode: (index: number) => void
}

const NodeStatusCard = React.forwardRef((props: NodeStatusCardProps, ref?: React.Ref<HTMLButtonElement>) => {

    const { edgeList, nodeList, currentNodeIndex, backgroundColor, editNeighborMode,
        currentNeighborIndex, addNeighborMode, expanded, onAddNeighbor, onDeleteNeighbor,
        onMouseEnterNeighbor, onMouseLeaveNeighbor, onClickNeighbor, onMouseEnterAvailableNeighbor,
        onMouseLeaveAvailableNeighbor, onClickAvailableNeighbor, onDeleteNode } = props;

    return (
        <div className="node-status-section">
            <Elevation className='node-status-card' z={3} height={10}>

                <NodeStatusTitle
                    currentNodeIndex={currentNodeIndex}
                    backgroundColor={backgroundColor}
                    editNeighborMode={editNeighborMode}
                    addNeighborMode={addNeighborMode}
                    currentNeighborIndex={currentNeighborIndex}
                    onAddNeighbor={onAddNeighbor}
                    onDeleteNeighbor={index => onDeleteNeighbor(index)}
                    ref={ref}
                />

                <div className="node-status-card-content">
                    <div className='node-status-card-neighbor-section'>
                        <NodeNeighborList
                            edgeList={edgeList}
                            nodeList={nodeList}
                            currentNodeIndex={currentNodeIndex}
                            currentNeighborIndex={currentNeighborIndex}
                            onMouseEnter={onMouseEnterNeighbor}
                            onMouseLeave={onMouseLeaveNeighbor}
                            onClick={index => onClickNeighbor(index)}
                        />

                        {edgeList.length !== 0 && <br />}

                        <AvailableNeighborList
                            expanded={expanded}
                            nodeList={nodeList}
                            edgeList={edgeList}
                            currentNodeIndex={currentNodeIndex}
                            onMouseEnter={onMouseEnterAvailableNeighbor}
                            onMouseLeave={onMouseLeaveAvailableNeighbor}
                            onClick={index => onClickAvailableNeighbor(index)}
                        />
                    </div>

                </div>

                <div className="node-status-card-manipulation">
                    <Button label='delete' danger onClick={() => onDeleteNode(currentNodeIndex)} />
                </div>

            </Elevation>
        </div>
    );
});

export default NodeStatusCard;