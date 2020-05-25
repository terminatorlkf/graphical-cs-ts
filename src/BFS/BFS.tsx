import React, { FunctionComponent, useState, useRef } from "react";
import AddNodeButton from "./GraphSection/Nodes/AddNodeButton"
import Konva from 'konva';
import IntroSection from '../shared/IntroSection/IntroSection';
import { nodeListStateInterface } from '../redux/BFS/store/graph/Interfaces/nodeListStateInterface';
import { presetNodeState } from '../redux/BFS/store/graph/PresetValues/PresetNodeState';
import { KonvaEventObject } from "konva/types/Node";
import Graph from './GraphSection/Graph'
import NodeStatusCard from './NodeStatusCard/NodeStatusCard';
import { useDispatch, useSelector } from "react-redux";
import * as graphActionType from '../redux/BFS/store/graph/graphActionType';

import '@rmwc/fab/styles';
import '@rmwc/tooltip/styles';
import './BFS.css'
import { bfsRootReducerInterface } from "../redux/BFS/store/rootReducer";


const BFS: FunctionComponent = () => {
    const [nodeListState, setNodeListState] = useState<nodeListStateInterface[]>(presetNodeState);
    const nodeRef = useRef() as React.MutableRefObject<Konva.Circle>;
    const buttonRef = useRef() as React.RefObject<HTMLButtonElement>;

    const dispatch = useDispatch();
    const graph = useSelector((state: bfsRootReducerInterface) => state.graph);

    const addNodeHandler = (x: number, y: number) => {
        dispatch({ type: graphActionType.ADD_NODE, payload: { x: x, y: y } });
    }

    const mouseOverNodeHandler = (index: number) => {
        // const newNodeState = [...nodeListState];
        // let newNode = { ...newNodeState[index] };
        // newNode.ref = nodeRef;
        // newNodeState[index] = newNode;
        // setNodeListState(newNodeState);
        dispatch({ type: graphActionType.MOUSE_ENTER_NODE, payload: { index: index} });
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

        const newNodeState = [...nodeListState];
        let newNode = { ...newNodeState[index] };
        newNode.ref = null;
        newNodeState[index] = newNode;
        setNodeListState(newNodeState);
    }

    const updatePosition = (index: number, e: KonvaEventObject<DragEvent>) => {
        setNodeListState(prevState => {
            let node = { ...prevState[index] };
            node = {
                ...node,
                xPosition: e.target.x(),
                yPosition: e.target.y()
            }
            prevState[index] = node;
            return prevState.slice();
        });
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
                    onDragMove={updatePosition}
                />

                <div className="search-status-stack-section">
                    {/* <h1>Priority Queue</h1> */}

                    {graph.currentNodeIndex !== -1 &&
                        <NodeStatusCard
                            onAddNeighbor={() => {
                                dispatch({ type: graphActionType.ADD_NEIGHBOR });
                                setTimeout(() => {
                                    buttonRef.current?.blur();
                                }, 360);
                            }}
                            onDeleteNeighbor={index => {
                                dispatch({ type: graphActionType.DELETE_NEIGHBOR, payload: { index: index} });
                                setTimeout(() => {
                                    buttonRef.current?.blur();
                                }, 360);
                            }}
                            onMouseEnterNeighbor={mouseOverNodeHandler}
                            onMouseLeaveNeighbor={mouseOutHandler}
                            onMouseEnterAvailableNeighbor={mouseOverNodeHandler}
                            onMouseLeaveAvailableNeighbor={mouseOutHandler}
                            ref={buttonRef}
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