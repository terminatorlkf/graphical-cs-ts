import React, { FunctionComponent, useState, useRef } from "react";
import AddNodeButton from "./AddNodeButton"
import { Elevation } from "@rmwc/elevation";
import { Button } from '@rmwc/button';
import Konva from 'konva';
import IntroSection from '../shared/IntroSection/IntroSection';
import { nodeListStateInterface } from './nodeListStateInterface';
import { presetNodeState, defaultFill } from './PresetNodeState';
import { KonvaEventObject } from "konva/types/Node";
import { presetEdges } from './presetEdges';
import OperationNodeSection from './OperationNodeSection/OperationNodeSection'
import NodeNeighborList from './NodeStatusCard/NodeNeighborSection/NodeNeighborList';
import AvailableNeighborList from './NodeStatusCard/AvailableNeighborList/AvailableNeighborList';
import NodeStatusTitle from './NodeStatusCard/NodeStatusTitle/NodeStatusTitle';
import NodeStatusCard from './NodeStatusCard/NodeStatusCard';

import '@rmwc/elevation/styles';
import '@rmwc/fab/styles';
import '@rmwc/tooltip/styles';
import '@rmwc/button/styles';
import './BFS.css'

const BFS: FunctionComponent = () => {
    const clickedFill = 'red';
    const [nodeListState, setNodeListState] = useState<nodeListStateInterface[]>(presetNodeState);
    const [edgeState, setEdgeState] = useState<number[][]>(presetEdges);
    const [nodeClickState, setNodeClickState] = useState<number>(-1);
    const [editNeighborMode, setEditNeighborMode] = useState<boolean>(false);
    const [addNeighborMode, setAddNeighborMode] = useState<boolean>(false);
    const [currentNeighbor, setCurrentNeighbor] = useState<number>(-1);
    const nodeRef = useRef() as React.MutableRefObject<Konva.Circle>;

    const addNodeHandler = (x: number, y: number) => {
        setNodeListState(prevState => {
            return [...prevState, {
                index: prevState.length,
                value: prevState.length,
                elevation: 5,
                className: "",
                xPosition: x,
                yPosition: y,
                fill: defaultFill,
                ref: null,
                neighbor: []
            }]
        });
    }

    const deleteNodeHandler = (index: number) => {
        setNodeListState(nodeListState.filter((node) => node.value !== index));
        setNodeClickState(-1);
    }

    const mouseOverNodeHandler = (index: number) => {
        const newNodeState = [...nodeListState];
        let newNode = { ...newNodeState[index] };
        newNode.ref = nodeRef;
        newNodeState[index] = newNode;
        setNodeListState(newNodeState);
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

    const nodeClickHandler = (index: number) => {
        const newNodeState = [...nodeListState];
        let newNode = { ...newNodeState[index] };
        newNode.fill = newNode.fill === defaultFill ? clickedFill : defaultFill;

        if (nodeRef.current) {
            nodeRef.current.to({
                fill: newNode.fill,
                duration: 0.15
            })
        }

        for (let i = 0; i < newNodeState.length; i++) {
            if (i !== index && newNodeState[i].fill === clickedFill) {
                let oldNode = { ...newNodeState[i] };
                oldNode.fill = defaultFill;
                newNodeState[i] = oldNode;
            }
        }

        newNodeState[index] = newNode;
        setNodeListState(newNodeState);

        if (newNode.fill === clickedFill) {
            setNodeClickState(index);
            setAddNeighborMode(false);
        } else {
            setNodeClickState(-1);
        }
    }

    const deleteNeighbor = (index: number) => {
        if (currentNeighbor !== -1) {
            setEdgeState(prevState => {
                return prevState.filter(edge => {
                    return !((edge[0] === index && edge[1] === nodeClickState) ||
                        (edge[0] === nodeClickState && edge[1] === index));
                });
            });
        }
        setEditNeighborMode(false);
    }

    const availableNeighborClickHandler = (index: number) => {
        setEdgeState(prevState => {
            return [...prevState, [index, nodeClickState]];
        });
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
                <OperationNodeSection
                    nodeList={nodeListState}
                    edgeList={edgeState}
                    onClick={nodeClickHandler}
                    onMouseEnter={mouseOverNodeHandler}
                    onMouseLeave={mouseOutHandler}
                    onDragMove={updatePosition}
                />

                <div className="search-status-stack-section">
                    {/* <h1>Priority Queue</h1> */}

                    {nodeClickState !== -1 &&
                            <NodeStatusCard
                                edgeList={edgeState}
                                nodeList={nodeListState}
                                currentNodeIndex={nodeClickState}
                                backgroundColor={clickedFill}
                                editNeighborMode={editNeighborMode}
                                addNeighborMode={addNeighborMode}
                                currentNeighborIndex={currentNeighbor}
                                expanded={addNeighborMode}
                                onAddNeighbor={() => {
                                    setAddNeighborMode(prevState => !prevState)
                                }}
                                onDeleteNeighbor={index => deleteNeighbor(index)}
                                onMouseEnterNeighbor={mouseOverNodeHandler}
                                onMouseLeaveNeighbor={mouseOutHandler}
                                onClickNeighbor={index => {
                                    setCurrentNeighbor(index);
                                    setEditNeighborMode(prevState => !prevState);
                                }}
                                onMouseEnterAvailableNeighbor={mouseOverNodeHandler}
                                onMouseLeaveAvailableNeighbor={mouseOutHandler}
                                onClickAvailableNeighbor={index => {
                                    availableNeighborClickHandler(index);
                                    mouseOutHandler(index);
                                }}
                                onDeleteNode={deleteNodeHandler}
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