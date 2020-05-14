import React, { FunctionComponent, useState, useRef } from "react";
import AddNodeButton from "./AddNodeButton"
import SmoothCollapse from "react-smooth-collapse";
import { Stage, Layer, Circle, Group, Text, Line } from "react-konva";
import { Elevation } from "@rmwc/elevation";
import { Button } from '@rmwc/button';
import Konva from 'konva';
import IntroSection from '../shared/IntroSection/IntroSection';
import { nodeListStateInterface } from './nodeListStateInterface';
import { presetNodeState } from './PresetNodeState';
import { KonvaEventObject } from "konva/types/Node";
import { presetEdges } from './presetEdges';

import '@rmwc/elevation/styles';
import '@rmwc/fab/styles';
import '@rmwc/tooltip/styles';
import '@rmwc/button/styles';
import './BFS.css'

const BFS: FunctionComponent = () => {
    const [nodeListState, setNodeListState] = useState<nodeListStateInterface[]>(presetNodeState);
    const [edgeState, setEdgeState] = useState<number[][]>(presetEdges);
    const [nodeClickState, setNodeClickState] = useState<number>(-1);
    const [addNeighborMode, setAddNeighborMode] = useState<boolean>(false);
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
                fill: 'white',
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
                    shadowBlur: 50,
                    duration: 0.1
                });
            }
        }, 0);
    }

    const mouseOutHandler = (index: number) => {
        if (nodeRef.current) {
            nodeRef.current.to({
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
        newNode.fill = newNode.fill === 'white' ? 'red' : 'white';

        nodeRef.current.to({
            fill: newNode.fill,
            duration: 0.15
        })

        for (let i = 0; i < newNodeState.length; i++) {
            if (i !== index && newNodeState[i].fill === 'red') {
                let oldNode = { ...newNodeState[i] };
                oldNode.fill = 'white';
                newNodeState[i] = oldNode;
            }
        }

        newNodeState[index] = newNode;
        setNodeListState(newNodeState);

        if (newNode.fill === 'red') {
            setNodeClickState(index);
        } else {
            setNodeClickState(-1);
        }
    }

    const neighborNodeClickHandler = (index: number) => {
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
                <div className="operation-node-section">
                    <Stage width={window.innerWidth - 580} height={window.innerHeight}>
                        <Layer>

                            {edgeState.length !== 0 &&
                                edgeState.map((edge, index) => {
                                    const x1 = nodeListState[edge[0]].xPosition;
                                    const y1 = nodeListState[edge[0]].yPosition;
                                    const x2 = nodeListState[edge[1]].xPosition;
                                    const y2 = nodeListState[edge[1]].yPosition;
                                    const locationVector = [x1, y1, x2, y2];

                                    return (
                                        <Line
                                            points={locationVector}
                                            stroke='black'
                                            strokeWidth={4}
                                        />
                                    )
                                })}

                            {nodeListState.map((node, index) => {
                                return (
                                    <Group
                                        key={index}
                                        x={node.xPosition}
                                        y={node.yPosition}
                                        draggable
                                        onClick={() => nodeClickHandler(index)}
                                        onMouseOver={() => mouseOverNodeHandler(index)}
                                        onMouseOut={() => mouseOutHandler(index)}
                                        onDragMove={e => updatePosition(index, e)}
                                    >
                                        <Circle
                                            ref={node.ref}
                                            radius={35}
                                            fill={node.fill}
                                            shadowBlur={node.elevation}
                                            shadowColor='black'
                                            shadowOffset={{ x: 0, y: 3 }}
                                            shadowOpacity={0.3}

                                        />
                                        <Text
                                            text={`${node.value}`}
                                            fontSize={20}
                                            fontFamily="'Roboto Mono'"
                                            fontStyle='bold'
                                            x={node.value < 10 ? -6 : -12}
                                            y={-7}
                                            fill={node.fill === 'white' ? 'black' : 'white'}
                                        />
                                    </Group>
                                )
                            })}
                        </Layer>
                    </Stage>
                </div>

                <div className="search-status-stack-section">
                    {/* <h1>Priority Queue</h1> */}

                    {nodeClickState !== -1 &&
                        <div className="node-status-section">
                            <Elevation className={nodeClickState !== -1 ? 'node-status-card' : ''} z={3} height={10}>

                                <div className="node-status-card-content">

                                    <h2 style={{ wordSpacing: '-5px' }}>{`node ${nodeClickState}`}</h2>

                                    <div className='node-status-card-neighbor-section'>
                                        <div className='neighbor-title'>
                                            <h4 style={{ marginTop: '0.4rem' }}>neighbor:</h4>
                                            <Button label={addNeighborMode ? 'finish' : 'add'} onClick={() => setAddNeighborMode(prevState => !prevState)} />
                                        </div>

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
                                                            onMouseOver={() => mouseOverNodeHandler(neighborNodeIndexOriginal)}
                                                            onMouseOut={() => mouseOutHandler(neighborNodeIndexOriginal)}
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
                                                                    neighborNodeClickHandler(index);
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