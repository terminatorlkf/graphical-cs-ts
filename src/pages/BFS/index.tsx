import React, { FunctionComponent, useRef, useEffect, useState } from "react";
import { getCanvasWidth } from 'shared/util/getCanvasWidth';
import { AddNodeButton } from "../../Components/AddNodeButton"
import { SearchView } from '../../Components/SearchView';
import Konva from 'konva';
import { IntroSection } from '../../Components/IntroSection';
import { Graph } from '../../Components/Graph'
import { NodeStatusCard } from '../../Components/NodeStatusCard';
import { useDispatch, useSelector } from "react-redux";
import * as graphActionType from '../../redux/BFS/graph/graphActionType';
import { BfsRootReducer } from "../../Interfaces/BfsRootReducer";
import { useTransition, animated } from 'react-spring';
import { ConfigCard } from '../../Components/ConfigCard';

import '@rmwc/fab/styles';
import '@rmwc/tooltip/styles';
import './BFS.css'

const BFS: FunctionComponent = () => {
    const nodeRef = useRef() as React.MutableRefObject<Konva.Circle>;

    const dispatch = useDispatch();
    const graph = useSelector((state: BfsRootReducer) => state.graph);

    const [{ canvasWidth, canvasHeight }, setCanvasWidthAndHeight] = useState({ canvasWidth: window.innerWidth - 200, canvasHeight: window.innerHeight});

    const nodeStatusCardTransition = useTransition(graph.nodeStatusCardToggled, null, {
        from: { opacity: 0, transform: 'translate3d(0, -1rem, 0)' },
        enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        leave: { opacity: 0, transform: 'translate3d(0, -1rem, 0)' },
        config: { tension: 170 }
    });

    const searchViewTransition = useTransition(graph.searchMode, null, {
        from: { transform: 'translate3d(0, 100%, 0)', position: 'absolute' },
        enter: { transform: 'translate3d(0, 0, 0)', position: 'absolute' },
        leave: { transform: 'translate3d(0, 110%, 0)', position: 'absolute' },
    });

    const addNodeHandler = (x: number, y: number) => {
        dispatch({ type: graphActionType.ADD_NODE, payload: { x, y } });
    }

    const mouseEnterHandler = (index: number) => {
        dispatch({ type: graphActionType.MOUSE_ENTER_NODE, payload: { index, ref: nodeRef } });
    }

    const mouseLeaveHandler = (index: number) => {
        dispatch({ type: graphActionType.MOUSE_LEAVE_NODE, payload: { index } })
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            setCanvasWidthAndHeight({
                canvasHeight: window.innerHeight,
                canvasWidth: window.innerWidth - 200
            });
        });

        return () => {
            window.removeEventListener('resize', () => {
                setCanvasWidthAndHeight({
                    canvasHeight: window.innerHeight,
                    canvasWidth: window.innerWidth - 200
                });
            })
        }
    }, [])

    return (
        <React.Fragment>
            {searchViewTransition.map(({ item, props, key }) => item &&
                <animated.div style={{ ...props, position: 'absolute', zIndex: 10000 }} key={key}>
                    <SearchView />
                </animated.div>
            )}

            <div>
                <IntroSection title="Breadth-First Search" source='Wikipedia'>
                    "Breadth-first search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph,
                    sometimes referred to as a 'search key'), and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.
                    It uses the opposite strategy as depth-first search, which instead explores the node branch as far as possible before being forced to backtrack and expand other nodes."
                </IntroSection>

                <ConfigCard />

                <div className="operation-section">
                    <Graph
                        width={canvasWidth}
                        height={canvasHeight}
                        draggable
                        clickable
                    />

                    <div className="search-status-stack-section">
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
                    </div>
                    <div className="add-node-button">
                        <AddNodeButton onClick={() => {
                            addNodeHandler(Math.random() * 100 + canvasWidth / 2, Math.random() * 100 + canvasHeight / 2)
                        }} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export { BFS };