import React from 'react';
import { Elevation } from '@rmwc/elevation';
import { nodeListStateInterface } from '../../../redux/BFS/store/graph/Interfaces/nodeListStateInterface';
import { EdgeListInterface } from '../../../redux/BFS/store/graph/Interfaces/EdgeListInterface';
import { useTransition, animated } from 'react-spring';
import { useSelector, useDispatch } from 'react-redux';
import * as graphActionType from '../../../redux/BFS/store/graph/graphActionType';
import { bfsRootReducerInterface } from '../../../redux/BFS/store/rootReducer';

import '@rmwc/elevation/styles';

export type EdgeNeighborListProps = {
    edgeList: EdgeListInterface[],
    nodeList: nodeListStateInterface[],
    currentEdgeIndex: number,
    onMouseEnter: (index: number) => void,
    onMouseLeave: (index: number) => void
}

const EdgeNeighborList = (props: EdgeNeighborListProps) => {
    const { edgeList, nodeList, currentEdgeIndex, onMouseEnter, onMouseLeave} = props;

    const currentEdge = edgeList[currentEdgeIndex].edge;
    const newNodeList = [nodeList[currentEdge[0]], nodeList[currentEdge[1]]];

    const dispatch = useDispatch();

    const transition = useTransition(newNodeList, node => node.index, {
        from: { opacity: 0, transform: 'translate3d(0, 1rem, 0)' },
        enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        leave: { opacity: 0}
    });

    return (
        <div className="neighbor-list">
            {transition.map(({ item, key, props }) => {
                const currentSelectedNodeIndex = nodeList.indexOf(item);
                return (
                    <animated.div style={props} key={key}>
                        <Elevation
                            style={{
                                paddingTop: '1%',
                                backgroundColor: 'white',
                                color: 'black'
                            }}
                            key={key}
                            z={2}
                            onMouseEnter={() => { onMouseEnter(currentSelectedNodeIndex) }}
                            onMouseLeave={() => { onMouseLeave(currentSelectedNodeIndex) }}
                            onClick={() => { dispatch({ type: graphActionType.CLICK_EXISTING_NEIGHBOR, payload: { neighborIndex: currentSelectedNodeIndex } }) }}
                            className="neighbor-node"
                        >
                            <p>{currentSelectedNodeIndex}</p>
                        </Elevation>
                    </animated.div>
                );
            })
            }
        </div>
    );
}

export default EdgeNeighborList;