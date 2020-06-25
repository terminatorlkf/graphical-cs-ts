import React, { FunctionComponent, useRef } from "react";
import { AddNodeButton }  from "../../Components/AddNodeButton"
import Konva from 'konva';
import { IntroSection } from '../../Components/IntroSection';
import { Graph } from '../../Components/Graph'
import { NodeStatusCard } from '../../Components/NodeStatusCard';
import { useDispatch, useSelector } from "react-redux";
import * as graphActionType from '../../redux/BFS/graph/graphActionType';
import { BfsRootReducer } from "../../Interfaces/BfsRootReducer";
import { useTransition, animated } from 'react-spring';
import SearchStatusStack from './SearchStatusStack';

import '@rmwc/fab/styles';
import '@rmwc/tooltip/styles';
import './BFS.css'

const BFS: FunctionComponent = () => {
    const nodeRef = useRef() as React.MutableRefObject<Konva.Circle>;

    const dispatch = useDispatch();
    const graph = useSelector((state: BfsRootReducer) => state.graph);

    const nodeStatusCardTransition = useTransition(graph.nodeStatusCardToggled, null, {
        from: { opacity: 0, transform: 'translate3d(0, -1rem, 0)' },
        enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        leave: { opacity: 0, transform: 'translate3d(0, -1rem, 0)' },
        config: { tension: 170 }
    });

    const addNodeHandler = (x: number, y: number) => {
        dispatch({ type: graphActionType.ADD_NODE, payload: { x, y } });
    }

    const mouseEnterHandler = (index: number) => {
        dispatch({ type: graphActionType.MOUSE_ENTER_NODE, payload: { index, ref: nodeRef } });

        console.log(nodeRef);

        setTimeout(() => {
            if (nodeRef.current) {
                nodeRef.current.to({
                    fontSize: 25,
                    radius: 40,
                    shadowBlur: 50,
                    duration: 0.1
                });
            }
        }, 0);
    }

    const mouseLeaveHandler = (index: number) => {
        if (nodeRef.current) {
            nodeRef.current.to({
                fontSize: 20,
                radius: 35,
                shadowBlur: 5,
                duration: 0.15
            });
        }

        dispatch({ type: graphActionType.MOUSE_LEAVE_NODE, payload: { index } })
    }

    return (
        <div style={{ backgroundColor: 'rgba(250, 250, 250, 1)' }}>
            <IntroSection title="Breadth-First Search" source='Wikipedia'>
                "Breadth-first search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph,
                sometimes referred to as a 'search key'), and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.
                It uses the opposite strategy as depth-first search, which instead explores the node branch as far as possible before being forced to backtrack and expand other nodes."
            </IntroSection>

            <div className="operation-section">
                <Graph
                    onMouseEnter={mouseEnterHandler}
                    onMouseLeave={mouseLeaveHandler}
                    onDragMove={(index, e) => dispatch({ type: graphActionType.DRAG_NODE, payload: { index, e } })}
                />

                <div className="search-status-stack-section">

                    <SearchStatusStack>
                        {nodeStatusCardTransition.map(({ item, key, props }) => {
                            return (
                                item &&
                                <animated.div style={props} key={key}>
                                    <NodeStatusCard
                                        onMouseEnterNeighbor={mouseEnterHandler}
                                        onMouseLeaveNeighbor={mouseLeaveHandler}
                                        onMouseEnterAvailableNeighbor={mouseEnterHandler}
                                        onMouseLeaveAvailableNeighbor={mouseLeaveHandler}
                                    />
                                </animated.div>
                            );
                        })}
                    </SearchStatusStack>

                </div>

                <div className="add-node-button">
                    <AddNodeButton onClick={() => {
                        addNodeHandler(Math.random() * (window.innerWidth - 700) + 100, Math.random() * 500)
                    }} />
                </div>
            </div>
        </div>
    );
}

export { BFS };