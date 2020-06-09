import React from 'react';
import { Elevation } from '@rmwc/elevation';
import { nodeListStateInterface } from '../../../redux/BFS/graph/Interfaces/nodeListStateInterface';
import { EdgeListInterface } from '../../../redux/BFS/graph/Interfaces/EdgeListInterface';
import { useTransition, animated } from 'react-spring';
import { useSelector, useDispatch } from 'react-redux';
import * as graphActionType from '../../../redux/BFS/graph/graphActionType';
import { bfsRootReducerInterface } from '../../../redux/BFS/store/rootReducer';

import '@rmwc/elevation/styles';

export type NodeNeighborListProps = {
    edgeList: EdgeListInterface[],
    nodeList: nodeListStateInterface[],
    currentNodeIndex: number,
    onMouseEnter: (index: number) => void,
    onMouseLeave: (index: number) => void
}

const NodeNeighborList = (props: NodeNeighborListProps) => {
    const { edgeList, nodeList, currentNodeIndex, onMouseEnter, onMouseLeave } = props;

    const graph = useSelector((state: bfsRootReducerInterface) => state.graph);
    const dispatch = useDispatch();

    const transition = useTransition(edgeList, edge => edge.key, {
        from: { opacity: 0, transform: 'translate3d(0, 1rem, 0)' },
        enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        leave: { opacity: 0, transform: 'translate3d(0, 1rem, 0)' }
    });

    return (
        <div className="neighbor-list">
            {transition.map(({ item, key, props }) => {
                let neighborNodeIndex = -1;
                if (item.edge[0] === nodeList[currentNodeIndex].index)
                    neighborNodeIndex = 1;

                if (item.edge[1] === nodeList[currentNodeIndex].index)
                    neighborNodeIndex = 0;

                if (neighborNodeIndex !== -1) {
                    let neighborNodeIndexOriginal = -1;

                    for (let i = 0; i < nodeList.length; i++) {
                        if (nodeList[i].index === item.edge[neighborNodeIndex]) neighborNodeIndexOriginal = i;
                    }
                    const backgroundColor = graph.currentNeighborIndex === neighborNodeIndexOriginal ? 'red' : 'white';
                    const textColor = graph.currentNeighborIndex === neighborNodeIndexOriginal ? 'white' : 'black';

                    return (
                        <animated.div style={props} key={key}>
                            <Elevation
                                style={{
                                    paddingTop: '1%',
                                    backgroundColor: backgroundColor,
                                    color: textColor
                                }}
                                key={key}
                                z={2}
                                className="neighbor-node"
                                onMouseEnter={() => { onMouseEnter(neighborNodeIndexOriginal) }}
                                onMouseLeave={() => { onMouseLeave(neighborNodeIndexOriginal) }}
                                onClick={() => { dispatch({ type: graphActionType.CLICK_EXISTING_NEIGHBOR, payload: { neighborIndex: neighborNodeIndexOriginal } }) }}
                            >
                                <p>{item.edge[neighborNodeIndex]}</p>
                            </Elevation>
                        </animated.div>
                    );
                }

                return null;
            })
            }
        </div>
    );
}

export default NodeNeighborList;