import React, { FunctionComponent, useRef } from "react";
import AddNodeButton from "./GraphSection/Nodes/AddNodeButton"
import Konva from 'konva';
import IntroSection from '../shared/IntroSection/IntroSection';
import Graph from './GraphSection/Graph'
import NodeStatusCard from './NodeStatusCard/NodeStatusCard';
import { useDispatch, useSelector } from "react-redux";
import * as graphActionType from '../redux/BFS/store/graph/graphActionType';
import { bfsRootReducerInterface } from "../redux/BFS/store/rootReducer";

import '@rmwc/fab/styles';
import '@rmwc/tooltip/styles';
import './BFS.css'

const BFS: FunctionComponent = () => {
    const nodeRef = useRef() as React.MutableRefObject<Konva.Circle>;

    const dispatch = useDispatch();
    const graph = useSelector((state: bfsRootReducerInterface) => state.graph);

    const addNodeHandler = (x: number, y: number) => {
        dispatch({ type: graphActionType.ADD_NODE, payload: { x, y } });
    }

    const mouseOverNodeHandler = (index: number) => {
        dispatch({ type: graphActionType.MOUSE_ENTER_NODE, payload: { index, ref: nodeRef } });

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

    const mouseOutHandler = (index: number) => {
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
        <div>
            <IntroSection title="Breadth-First Search" source='Wikipedia'>
                "Breadth-first search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph,
                sometimes referred to as a 'search key'), and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.
                It uses the opposite strategy as depth-first search, which instead explores the node branch as far as possible before being forced to backtrack and expand other nodes."
            </IntroSection>

            <div className="operation-section">
                <Graph
                    onMouseEnter={mouseOverNodeHandler}
                    onMouseLeave={mouseOutHandler}
                    onDragMove={(index, e) => dispatch({ type: graphActionType.DRAG_NODE, payload: { index, e } })}
                />

                <div className="search-status-stack-section">

                    {graph.currentNodeIndex !== -1 &&
                        <NodeStatusCard
                            onMouseEnterNeighbor={mouseOverNodeHandler}
                            onMouseLeaveNeighbor={mouseOutHandler}
                            onMouseEnterAvailableNeighbor={mouseOverNodeHandler}
                            onMouseLeaveAvailableNeighbor={mouseOutHandler}
                        />
                    }

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

export default BFS;