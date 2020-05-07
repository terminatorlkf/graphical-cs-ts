import React, { FunctionComponent, useState, useContext, useRef } from "react";
import { Elevation } from "@rmwc/elevation";
import { ThemeProvider } from "@rmwc/theme";
import { Button } from "@rmwc/button";
import SmoothCollapse from "react-smooth-collapse";
import { IntroExpandedContext } from "../Context/IntroExpandedContext";
import AddNodeButton from "./AddNodeButton"
import { Stage, Layer, Circle } from "react-konva";
import Konva from 'konva';

import '@rmwc/theme/styles';
import '@rmwc/fab/styles';
import '@rmwc/icon/styles';
import '@rmwc/tooltip/styles';
import '@rmwc/button/styles';
import '@rmwc/elevation/styles';
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
    const IntroExpanded = useContext(IntroExpandedContext);

    const isOpenedGlobal = IntroExpanded && IntroExpanded.pagesExpanded[0];
    const setIsOpenedGlobal = IntroExpanded && IntroExpanded.setExpanded;

    const [nodeListState, setNodeListState] = useState<nodeListStateInterface[]>([]);
    const [isOpened, setIsOpened] = useState(isOpenedGlobal ? true : false);
    const [collapsedTitleState, setCollapsedTitleState] = useState(isOpenedGlobal ? "" : " intro-section-collapsed");
    const [expandButtonIsMounted, setExpandButtonIsMounted] = useState(isOpenedGlobal ? false : true);

    const nodeRef = useRef() as React.MutableRefObject<Konva.Circle>;

    const collapseHandler = () => {
        setIsOpenedGlobal && setIsOpenedGlobal(0);

        setIsOpened((prevState: boolean) => {
            return !prevState;
        });

        if (isOpened) {
            setTimeout(() => {
                setCollapsedTitleState(" intro-section-collapsed");
                setExpandButtonIsMounted(true);
            }, 150);
        } else {
            setExpandButtonIsMounted(false);
            setTimeout(() => {
                setCollapsedTitleState("");
            }, 20);
        }
    }

    const addNodeHandler = (x: number, y: number) => {
        setNodeListState(prevState => {
            return [...prevState, {
                value: getRandomInt(100),
                elevation: 3,
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
            shadowBlur: 10,
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
            <div className={"intro-section" + collapsedTitleState}>
                <div className="intro-section-content">
                    <div className={"intro-section-content-title" + collapsedTitleState}>
                        <h1>Breadth-First Search</h1>
                    </div>


                    <SmoothCollapse expanded={isOpened}>
                        <div className="description">
                            <p>
                                "Breadth-first search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph,
                                sometimes referred to as a 'search key'), and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.
                                It uses the opposite strategy as depth-first search, which instead explores the node branch as far as possible before being forced to backtrack and expand other nodes."
                            </p>

                            <p>--Wikipedia</p>
                        </div>

                        {isOpened &&
                            <div className='collapse-button'>
                                <ThemeProvider
                                    options={{
                                        primary: 'white'
                                    }} >
                                    <Button onClick={collapseHandler} label="start exploring" unelevated />
                                </ThemeProvider>
                            </div>
                        }
                    </SmoothCollapse>

                </div>

                {expandButtonIsMounted &&
                    <div className='expand-button'>
                        <ThemeProvider
                            options={{
                                primary: 'white'
                            }} >
                            <Button onClick={collapseHandler} label="expand" dense />
                        </ThemeProvider>
                    </div>
                }

            </div>

            <div className="operation-section">
                <div className="operation-node-section">
                    <Stage width={window.innerWidth - 850} height={window.innerHeight}>
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
                        addNodeHandler(Math.random() * (window.innerWidth - 950) + 35, Math.random() * 500 + 30)
                    }} />
                </div>
            </div>
        </div>
    );
}

export default BFS;