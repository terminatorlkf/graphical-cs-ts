import React, { useState, useEffect, useRef } from 'react'
import { Graph } from '../Graph';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@rmwc/button';
import * as graphActionType from 'redux/BFS/graph/graphActionType';
import { BfsRootReducer } from 'Interfaces/BfsRootReducer';
import { useTransition, animated } from '@react-spring/konva';
import { Snackbar } from '@rmwc/snackbar';
import { Fab } from '@rmwc/fab';
import ClearIcon from '@material-ui/icons/Clear';

import '@rmwc/button/styles';
import '@rmwc/fab/styles';

export const SearchView = () => {
    const dispatch = useDispatch();

    const buttonRef = useRef() as React.RefObject<HTMLButtonElement>;

    const searchTrackGlobal = useSelector((state: BfsRootReducer) => state.graph.searchTrack);
    const nodeList = useSelector((state: BfsRootReducer) => state.graph.nodeList);
    const graph = useSelector((state: BfsRootReducer) => state.graph);

    const [{ canvasWidth, canvasHeight }, setCanvasWidthAndHeight] = useState({ canvasWidth: window.innerWidth - 100, canvasHeight: window.innerHeight - 100 });
    const [track, setTrack] = useState<number[][]>([]);
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

                    setTrack(prevState => [...prevState, [parentNodeIndex, neighborIndex]]);

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
        if (track.length === searchTrackGlobal.parentTrackList.length && searchTrackGlobal.path.length === 0) {
            setTimeout(() => {
                setNoPathFound(true);
            }, 300)
        }
    }, [track.length, searchTrackGlobal.parentTrackList.length, searchTrackGlobal.path.length])

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

            setTrack(prevState => prevState.filter(nodePair =>
                searchTrackGlobal.path.includes(nodePair[0]) && searchTrackGlobal.path.includes(nodePair[1])
            ));
        }
    }, [pathFound]);

    const quieSearchViewHandler = () => {
        dispatch({ type: graphActionType.TOGGLE_SEARCH_MODE });
        nodeList.forEach(node => {
            dispatch({ type: graphActionType.SET_VISITED_NODE, payload: { nodeAndAction: { actualNodeIndex: node.index, visited: false } } })
        });
    }

    const transition = useTransition(track, {
        from: nodePair => {
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
        enter: nodePair => {
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
        leave: nodePair => {
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

    return (
        <div className='search-view'>
            <Fab className='quit-button' style={{ backgroundColor: graph.destinationFill }} onClick={quieSearchViewHandler}><ClearIcon /></Fab>

            <div className='action-area'>
                <Button
                    style={{ backgroundColor: graph.defaultFill }}
                    raised={!(pathFound || noPathFound)}
                    disabled={pathFound || noPathFound}
                    ref={buttonRef}
                    label={track.length > 0 ? 'next step' : 'start search'}
                    onClick={searchHandler}
                />
            </div>

            <Snackbar
                open={pathFound}
                message='Path Found'
            />

            <Snackbar
                open={noPathFound}
                message='No Path Found'
            />

            <Graph width={canvasWidth} height={canvasHeight}>
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

                    .action-area {
                        padding-top: 3.5rem;
                        position: relative;
                        padding-bottom: 4.5rem;
                        height: 164px;
                        display: flex;
                    }
                
                `}
            </style>
        </div>
    )
}
