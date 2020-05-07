import React, { FunctionComponent, useState, useRef } from "react";
import AddNodeButton from "./AddNodeButton"
import { Stage, Layer, Circle } from "react-konva";
import Konva from 'konva';
import IntroSection from '../shared/IntroSection/IntroSection';

import '@rmwc/fab/styles';
import '@rmwc/tooltip/styles';
import './BFS.css'

const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
}

interface nodeListStateInterface {
    value: number,
    elevation: number,
    className: string,
    xPosition: number,
    yPosition: number,
    fill: string,
    ref: React.MutableRefObject<Konva.Circle> | null
}

const BFS: FunctionComponent = () => {
    const [nodeListState, setNodeListState] = useState<nodeListStateInterface[]>([]);
    const nodeRef = useRef() as React.MutableRefObject<Konva.Circle>;

    const addNodeHandler = (x: number, y: number) => {
        setNodeListState(prevState => {
            return [...prevState, {
                value: getRandomInt(100),
                elevation: 5,
                className: "",
                xPosition: x,
                yPosition: y,
                fill: 'white',
                ref: null
            }]
        });
    }

    const mouseOverNodeHandler = (index: number) => {
        const newNodeState = [...nodeListState];
        let newNode = { ...newNodeState[index] };
        newNode.ref = nodeRef;
        newNodeState[index] = newNode;
        setNodeListState(newNodeState);
        nodeRef.current.to({
            shadowBlur: 50,
            duration: 0.1
        });
    }

    const mouseOutHandler = (index: number) => {
        nodeRef.current.to({
            shadowBlur: 5,
            duration: 0.15
        });
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
                            {nodeListState.map((node, index) => {
                                return (
                                    <Circle
                                        ref={node.ref}
                                        x={node.xPosition}
                                        y={node.yPosition}
                                        radius={35}
                                        fill={node.fill}
                                        draggable
                                        shadowBlur={node.elevation}
                                        shadowColor='black'
                                        shadowOffset={{ x: 0, y: 3 }}
                                        shadowOpacity={0.3}
                                        onClick={() => nodeClickHandler(index)}
                                        onMouseOver={() => mouseOverNodeHandler(index)}
                                        onMouseOut={() => mouseOutHandler(index)}
                                    />
                                )
                            })}
                        </Layer>
                    </Stage>
                </div>

                <div className="search-status-stack-section">
                    <h1>Priority Queue</h1>
                </div>

                <div className="add-node-button">
                    <AddNodeButton onClick={() => {
                        addNodeHandler(Math.random() * (window.innerWidth - 300) + 100, Math.random() * 500 + 30)
                    }} />
                </div>
            </div>
        </div>
    );
}

export default BFS;