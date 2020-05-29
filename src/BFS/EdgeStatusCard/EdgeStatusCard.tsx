import React, { useRef } from 'react';
import { Elevation } from '@rmwc/elevation';
import EdgeStatusTitle from './EdgeStatusTitle/EdgeStatusTitle';
import EdgeNeihborList from './EdgeNeighborList/EdgeNeighborList'
import { Button } from '@rmwc/button';
import * as graphActionType from '../../redux/BFS/store/graph/graphActionType';

import '@rmwc/elevation/styles';
import '@rmwc/button/styles';
import { useSelector, useDispatch } from 'react-redux';
import { bfsRootReducerInterface } from '../../redux/BFS/store/rootReducer';
import { CurrentPageContext } from '../../Context/CurrentPageContext';

export type edgeStatusCardProps = {
    onMouseEnterNeighbor: (index: number) => void,
    onMouseLeaveNeighbor: (index: number) => void
}

const EdgeStatusCard = (props: edgeStatusCardProps) => {
    const {onMouseEnterNeighbor, onMouseLeaveNeighbor} = props;

    const graph = useSelector((state: bfsRootReducerInterface) => state.graph);
    const buttonRef = useRef() as React.RefObject<HTMLButtonElement>;
    const dispatch = useDispatch();

    return (
        <div className="node-status-section">
            <Elevation className='node-status-card' z={3} height={10}>

                <EdgeStatusTitle
                    currentEdgeIndex={graph.currentEdgeIndex}
                    backgroundColor={graph.clickedFill}
                    ref={buttonRef}
                />

                <div className="node-status-card-content">
                    <div className='node-status-card-neighbor-section'>
                        <EdgeNeihborList
                            edgeList={graph.edgeList}
                            nodeList={graph.nodeList}
                            currentEdgeIndex={graph.currentEdgeIndex}
                            onMouseEnter={onMouseEnterNeighbor}
                            onMouseLeave={onMouseLeaveNeighbor}
                        />
                    </div>

                </div>

                <div className="node-status-card-manipulation">
                    <Button label='delete' danger onClick={() => dispatch({ type: graphActionType.DELETE_EDGE, payload: { index: graph.currentEdgeIndex } })} />
                </div>

            </Elevation>
        </div>
    )
}

export default EdgeStatusCard;
