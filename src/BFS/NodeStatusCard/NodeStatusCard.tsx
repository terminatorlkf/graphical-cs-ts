import React, { useRef } from 'react';
import { Elevation } from '@rmwc/elevation';
import NodeStatusTitle from './NodeStatusTitle/NodeStatusTitle';
import NodeNeighborList from './NodeNeighborSection/NodeNeighborList';
import AvailableNeighborList from './AvailableNeighborList/AvailableNeighborList';
import { Button } from '@rmwc/button';
import * as graphActionType from '../../redux/BFS/store/graph/graphActionType';
import { useSelector, useDispatch } from 'react-redux';
import { bfsRootReducerInterface } from '../../redux/BFS/store/rootReducer';
import { useSpring, animated } from 'react-spring';

import '@rmwc/elevation/styles';
import '@rmwc/button/styles';

export type NodeStatusCardProps = {
    onMouseEnterNeighbor: (index: number) => void,
    onMouseLeaveNeighbor: (index: number) => void,
    onMouseEnterAvailableNeighbor: (index: number) => void,
    onMouseLeaveAvailableNeighbor: (index: number) => void,
}

const NodeStatusCard = (props: NodeStatusCardProps) => {
    const dispatch = useDispatch();
    const graph = useSelector((state: bfsRootReducerInterface) => state.graph);
    const buttonRef = useRef() as React.RefObject<HTMLButtonElement>;
    
    const addNeighborModeHandler = () => {
        dispatch({ type: graphActionType.ADD_NEIGHBOR });
        setTimeout(() => {
            buttonRef.current?.blur();
        }, 360);
    }

    const deleteNeighborHandler = (index: number) => {
        dispatch({ type: graphActionType.DELETE_NEIGHBOR, payload: { index } });
        setTimeout(() => {
            buttonRef.current?.blur();
        }, 360);
    }

    return (
        <div className="node-status-section">
            <Elevation className='node-status-card' z={3} height={10}>

                <NodeStatusTitle
                    currentNodeIndex={graph.currentNodeIndex}
                    backgroundColor={graph.clickedFill}
                    editNeighborMode={graph.editNeighborMode}
                    addNeighborMode={graph.addNeighborMode}
                    onAddNeighbor={addNeighborModeHandler}
                    onDeleteNeighbor={() => deleteNeighborHandler(graph.currentNeighborIndex)}
                    ref={buttonRef}
                />

                <div className="node-status-card-content">
                    <div className='node-status-card-neighbor-section'>
                        <NodeNeighborList
                            edgeList={graph.edgeList}
                            nodeList={graph.nodeList}
                            currentNodeIndex={graph.currentNodeIndex}
                            onMouseEnter={props.onMouseEnterNeighbor}
                            onMouseLeave={props.onMouseLeaveNeighbor}
                        />

                        {graph.edgeList.length !== 0 && <br />}

                        <AvailableNeighborList
                            expanded={graph.addNeighborMode}
                            nodeList={graph.nodeList}
                            edgeList={graph.edgeList}
                            currentNodeIndex={graph.currentNodeIndex}
                            onMouseEnter={props.onMouseEnterAvailableNeighbor}
                            onMouseLeave={props.onMouseLeaveAvailableNeighbor}
                            onClick={index => dispatch({ type: graphActionType.CLICK_AVAILABLE_NEIGHBOR, payload: { index: index } })}
                        />
                    </div>

                </div>

                <div className="node-status-card-manipulation">
                    <Button label='delete' danger onClick={() => dispatch({ type: graphActionType.DELETE_NODE, payload: { index: graph.currentNodeIndex } })} />
                </div>

            </Elevation>
        </div>
    );
};

export default NodeStatusCard;