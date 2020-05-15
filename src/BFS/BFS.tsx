import React, { FunctionComponent, useState, useRef } from "react";
import AddNodeButton from "./AddNodeButton"
import SmoothCollapse from "react-smooth-collapse";
import { Stage, Layer, Circle, Group, Text } from "react-konva";
import { Elevation } from "@rmwc/elevation";
import { Button } from '@rmwc/button';
import Konva from 'konva';
import IntroSection from '../shared/IntroSection/IntroSection';
import { nodeListStateInterface } from './nodeListStateInterface';
import { presetNodeState, defaultFill } from './PresetNodeState';
import { KonvaEventObject } from "konva/types/Node";
import { presetEdges } from './presetEdges';
import OperationNodeSection from './OperationNodeSection/OperationNodeSection'

import '@rmwc/elevation/styles';
import '@rmwc/fab/styles';
import '@rmwc/tooltip/styles';
import '@rmwc/button/styles';
import './BFS.css'

const BFS: FunctionComponent = () => {
    const clickedFill = '#EC407A';
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
        console.log(newNode.ref);
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
        console.log(index);
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
                        <div className="node-status-section">
                            <Elevation className={nodeClickState !== -1 ? 'node-status-card' : ''} z={3} height={10}>

                                <div className="node-status-card-title">
                                    <h2 style={{ wordSpacing: '-5px' }}>{`node ${nodeClickState}`}</h2>
                                </div>

                                <div className="node-status-card-content">

                                    <div className='neighbor-title'>
                                        <h4 style={{ marginTop: '0.4rem' }}>neighbor</h4>
                                        {!editNeighborMode ?
                                            <Button label={addNeighborMode ? 'finish' : 'add'} onClick={() => setAddNeighborMode(prevState => !prevState)} />
                                            :
                                            <Button label='delete neighbor' onClick={() => deleteNeighbor(currentNeighbor)} />
                                        }
                                    </div>

                                    <div className='node-status-card-neighbor-section'>
                                        <div className="neighbor-list">
                                            {edgeState.map((nodePair, index) => {
                                                let neighborNodeIndex = -1;
                                                if (nodePair[0] === nodeListState[nodeClickState].index)
                                                    neighborNodeIndex = 1;

                                                if (nodePair[1] === nodeListState[nodeClickState].index)
                                                    neighborNodeIndex = 0;

                                                if (neighborNodeIndex !== -1) {
                                                    let neighborNodeIndexOriginal = -1;

                                                    for (let i = 0; i < nodeListState.length; i++) {
                                                        if (nodeListState[i].index === nodePair[neighborNodeIndex])
                                                            neighborNodeIndexOriginal = i;
                                                    }

                                                    return (
                                                        <Elevation
                                                            key={index}
                                                            z={2}
                                                            className="neighbor-node"
                                                            onMouseEnter={() => mouseOverNodeHandler(neighborNodeIndexOriginal)}
                                                            onMouseLeave={() => mouseOutHandler(neighborNodeIndexOriginal)}
                                                            onClick={() => {
                                                                setCurrentNeighbor(neighborNodeIndexOriginal);
                                                                setEditNeighborMode(true);
                                                            }}
                                                        >
                                                            <p>{nodePair[neighborNodeIndex]}</p>
                                                        </Elevation>
                                                    );
                                                }
                                            })
                                            }
                                        </div>

                                        {edgeState.length !== 0 &&
                                            <br />
                                        }

                                        <SmoothCollapse allowOverflowWhenOpen expanded={addNeighborMode} className="neighbor-list-collapse-section">
                                            <div className="neighbor-list">
                                                {nodeListState.map((node, index) => {
                                                    let isNeighbor = true;
                                                    if (node.value === nodeClickState)
                                                        isNeighbor = false;

                                                    edgeState.map(nodePair => {
                                                        if ((nodePair[0] === nodeListState[nodeClickState].index && nodePair[1] === node.index) ||
                                                            (nodePair[1] === nodeListState[nodeClickState].index && nodePair[0] === node.index)) {
                                                            isNeighbor = false;
                                                        }
                                                    })

                                                    if (isNeighbor) {
                                                        return (
                                                            <Elevation
                                                                key={index}
                                                                z={2}
                                                                className="neighbor-node"
                                                                onMouseOver={() => mouseOverNodeHandler(index)}
                                                                onMouseOut={() => mouseOutHandler(index)}
                                                                onClick={() => {
                                                                    availableNeighborClickHandler(index);
                                                                    mouseOutHandler(index);
                                                                }}
                                                            >
                                                                <p>{node.value}</p>
                                                            </Elevation>
                                                        )
                                                    }
                                                })}

                                            </div>
                                        </SmoothCollapse>
                                    </div>

                                </div>

                                <div className="node-status-card-manipulation">
                                    <Button label='delete node' danger onClick={() => deleteNodeHandler(nodeClickState)} />
                                </div>

                            </Elevation>
                        </div>
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