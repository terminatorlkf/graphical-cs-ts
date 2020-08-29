import React, { useState, useEffect, useRef } from 'react'
import { Graph } from '../Graph';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@rmwc/button';
import * as graphActionType from 'redux/BFS/graph/graphActionType';
import { BfsRootReducer } from 'Interfaces/BfsRootReducer';
import { useSpring, animated as a, config } from 'react-spring';
import { useTransition, animated } from '@react-spring/konva';
import { Snackbar } from '@rmwc/snackbar';
import { Fab } from '@rmwc/fab';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Node } from 'Interfaces/Node';
import { Track } from 'Interfaces/Track';

import '@rmwc/button/styles';
import '@rmwc/fab/styles';


export const SearchView = () => {
    const dispatch = useDispatch();

    const buttonRef = useRef() as React.RefObject<HTMLButtonElement>;

    const searchTrackGlobal = useSelector((state: BfsRootReducer) => state.graph.searchTrack);
    const nodeList = useSelector((state: BfsRootReducer) => state.graph.nodeList);
    const graph = useSelector((state: BfsRootReducer) => state.graph);

    const [{ canvasWidth, canvasHeight }, setCanvasWidthAndHeight] = useState({ canvasWidth: window.innerWidth - 100, canvasHeight: window.innerHeight - 100 });
    const [trackList, setTrackList] = useState<Track[]>([]);
    const [backupTrackList, setBackupTrackList] = useState<Track[]>([]);
    const [index, setIndex] = useState<number>(0);
    const [pathFound, setPathFound] = useState<boolean>(false);
    const [noPathFound, setNoPathFound] = useState<boolean>(false);

    let parentNodeIndex = index < searchTrackGlobal.parentTrackList.length ? searchTrackGlobal.parentTrackList[index].parentNodeIndex : -1;

    const searchHandler = () => {
        if (index < searchTrackGlobal.parentTrackList.length && parentNodeIndex !== -1) {
            let nodeIndex = index

            while (nodeIndex < searchTrackGlobal.parentTrackList.length && searchTrackGlobal.parentTrackList[nodeIndex].searchedNeighbor.length === 0) {
                nodeIndex++;
                parentNodeIndex = nodeIndex < searchTrackGlobal.parentTrackList.length ? searchTrackGlobal.parentTrackList[nodeIndex].parentNodeIndex : -1;
            }

            if (nodeIndex < searchTrackGlobal.parentTrackList.length && parentNodeIndex !== -1) {
                searchTrackGlobal.parentTrackList[nodeIndex].searchedNeighbor.forEach(neighborIndex => {
                    dispatch({
                        type: graphActionType.SET_VISITED_NODE, payload: {
                            nodeAndAction: {
                                actualNodeIndex: parentNodeIndex,
                                visited: true
                            }
                        }
                    });

                    dispatch({
                        type: graphActionType.SET_VISITED_NODE, payload: {
                            nodeAndAction: {
                                actualNodeIndex: neighborIndex,
                                visited: true
                            }
                        }
                    });

                    setTrackList(prevState => [...prevState, { track: [parentNodeIndex, neighborIndex], index: index }]);

                    if (neighborIndex === graph.destinationNodeIndex) {
                        setTimeout(() => {
                            setPathFound(true);
                        }, 300)
                    }
                });
                setIndex(nodeIndex + 1);
            }
        }

        setTimeout(() => {
            buttonRef?.current?.blur();
        }, 320)
    }

    const previousStepHandler = () => {
        if (index - 1 >= 0) {
            if (pathFound) {
                dispatch({
                    type: graphActionType.SET_VISITED_NODE,
                    payload: {
                        nodeAndAction: {
                            actualNodeIndex: trackList[trackList.length - 1].track[1],
                            visited: false
                        }
                    }
                });

                setTrackList(backupTrackList);
                setIndex(trackList[trackList.length - 1].index);

                backupTrackList.forEach(track => {
                    console.log("hello");
                    dispatch({
                        type: graphActionType.SET_VISITED_NODE,
                        payload: {
                            nodeAndAction: {
                                actualNodeIndex: track.track[0],
                                visited: true
                            }
                        }
                    });
                    dispatch({
                        type: graphActionType.SET_VISITED_NODE,
                        payload: {
                            nodeAndAction: {
                                actualNodeIndex: track.track[1],
                                visited: true
                            }
                        }
                    });
                })

                setPathFound(false);
            } else {
                trackList.forEach(track => {
                    let actualNodeIndex = -1;
                    let numNode = 0;

                    if (track.index === index - 1) {
                        actualNodeIndex = track.track[1];
                    }

                    trackList.forEach(track => {
                        if (track.track[1] === actualNodeIndex) numNode++;
                    });

                    if (numNode === 1) {
                        dispatch({
                            type: graphActionType.SET_VISITED_NODE, payload: {
                                nodeAndAction: {
                                    actualNodeIndex: actualNodeIndex,
                                    visited: false
                                }
                            }
                        });
                    }
                })

                setTrackList(prevState => prevState.filter(track => track.index !== index - 1));
                setIndex(prevState => prevState - 1);
            }
        }
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            setCanvasWidthAndHeight({
                canvasWidth: window.innerWidth - 100,
                canvasHeight: window.innerHeight - 100
            });
        });

        return () => {
            window.removeEventListener('resize', () => {
                setCanvasWidthAndHeight({
                    canvasWidth: window.innerWidth - 100,
                    canvasHeight: window.innerHeight - 100
                });
            })
        };
    }, []);

    useEffect(() => {
        if (trackList.length === searchTrackGlobal.parentTrackList.length && searchTrackGlobal.path.length === 0) {
            setTimeout(() => {
                setNoPathFound(true);
            }, 300)
        }
    }, [trackList.length, searchTrackGlobal.parentTrackList.length, searchTrackGlobal.path.length])

    useEffect(() => {
        if (pathFound) {
            nodeList.forEach(node => {
                dispatch({
                    type: graphActionType.SET_VISITED_NODE, payload: {
                        nodeAndAction: {
                            actualNodeIndex: node.index,
                            visited: searchTrackGlobal.path.includes(node.index)
                        }
                    }
                })
            })

            setBackupTrackList(trackList.slice(0, trackList.length - 2));
            setTrackList(prevState => prevState.filter(track =>
                searchTrackGlobal.path.includes(track.track[0]) && searchTrackGlobal.path.includes(track.track[1])
            ));
        }
    }, [pathFound]);

    const quitSearchViewHandler = () => {
        dispatch({ type: graphActionType.TOGGLE_SEARCH_MODE });
        nodeList.forEach(node => {
            dispatch({ type: graphActionType.SET_VISITED_NODE, payload: { nodeAndAction: { actualNodeIndex: node.index, visited: false } } })
        });
    }

    const findPoints = (nodePair: number[], nodeList: Node[]) => {
        const firstNodeIndex = nodePair[0];
        const secondNodeIndex = nodePair[1];

        let points = [0, 0, 0, 0];

        nodeList.map(node => {
            if (node.index === firstNodeIndex) {
                points[0] = node.xPosition;
                points[1] = node.yPosition;
            }

            if (node.index === secondNodeIndex) {
                points[2] = node.xPosition;
                points[3] = node.yPosition;
            }
            return null;
        });

        return points;
    }

    const transition = useTransition(trackList, {
        from: track => {
            const nodePair = track.track;
            let nodeIndex = -1;

            nodeList.forEach((node, index) => {
                if (node.index === nodePair[0]) nodeIndex = index;
            });

            return {
                points: nodeIndex !== -1 && [
                    nodeList[nodeIndex].xPosition,
                    nodeList[nodeIndex].yPosition,
                    nodeList[nodeIndex].xPosition,
                    nodeList[nodeIndex].yPosition,
                ]
            }
        },
        enter: track => {
            const nodePair = track.track;

            let node1Index = -1;
            let node2Index = -1;

            nodeList.forEach((node, index) => {
                if (node.index === nodePair[0]) node1Index = index;
                if (node.index === nodePair[1]) node2Index = index;
            });

            return {
                points: node1Index !== -1 && node2Index !== -1 && [
                    nodeList[node1Index].xPosition,
                    nodeList[node1Index].yPosition,
                    nodeList[node2Index].xPosition,
                    nodeList[node2Index].yPosition,
                ]
            }
        },
        update: track => {
            const nodePair = track.track;
            const points = findPoints(nodePair, nodeList);
            return graph.updateNodePositionMode && {
                points,
                config: { duration: 1 }
            }
        },
        leave: track => {
            const nodePair = track.track;
            let nodeIndex = -1;

            nodeList.forEach((node, index) => {
                if (node.index === nodePair[0]) nodeIndex = index;
            });

            return {
                points: [
                    nodeList[nodeIndex].xPosition,
                    nodeList[nodeIndex].yPosition,
                    nodeList[nodeIndex].xPosition,
                    nodeList[nodeIndex].yPosition,
                ]
            }
        }
    });

    const springProps = useSpring({
        width: trackList.length === 0 ? '10rem' : '24rem',
        justifyContent: trackList.length === 0 ? 'center' : 'space-around',
        config: config.stiff
    });

    return (
        <div className='search-view'>
            <Fab className='quit-button' style={{ backgroundColor: graph.destinationFill }} onClick={quitSearchViewHandler}>
                <ClearIcon />
            </Fab>

            <a.div style={springProps} className='action-area'>
                {trackList.length > 0 &&
                    <Button
                        style={{ backgroundColor: graph.defaultFill }}
                        raised
                        // ref={buttonRef}
                        onClick={previousStepHandler}
                    >
                        <div className='action-view-button previous-button'>
                            <ArrowBackIcon style={{ marginTop: '-2px' }} />
                            <span>previous step</span>
                        </div>
                    </Button>
                }

                <Button
                    style={{ backgroundColor: graph.defaultFill }}
                    raised={!(pathFound || noPathFound)}
                    disabled={pathFound || noPathFound}
                    ref={buttonRef}
                    onClick={searchHandler}
                >
                    <div className='action-view-button next-button'>
                        <span>{trackList.length > 0 ? 'next step' : 'start search'}</span>
                        {trackList.length > 0 && <ArrowForwardIcon style={{ marginTop: '-2px' }} />}
                    </div>
                </Button>
            </a.div>

            <Snackbar
                open={pathFound}
                message='Path Found'
            />

            <Snackbar
                open={noPathFound}
                message='No Path Found'
            />

            <Graph width={canvasWidth} height={canvasHeight} draggable>
                {transition(style => (
                    <animated.Line {...style} stroke={graph.rootFill} strokeWidth={5.5} />
                ))}
            </Graph>

            <style>
                {`
                    .search-view {
                        margin-top: -4.7rem;
                        background-color: white;
                        height: 100vh;
                        width: 100vw;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        overflow: hidden;
                    }

                    .quit-button {
                        position: absolute;
                        top: -2rem;
                        left: 2rem;
                    }

                    .action-view-button {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .next-button {
                        width: 7.3rem;
                    }

                    .previous-button {
                        width: 9.5rem;
                    }

                    .action-area {
                        padding-top: 3.5rem;
                        position: relative;
                        padding-bottom: 4.5rem;
                        height: 164px;
                        display: flex;
                        width: 24rem;
                        flex-direction: row;
                    }
                
                `}
            </style>
        </div>
    )
}
