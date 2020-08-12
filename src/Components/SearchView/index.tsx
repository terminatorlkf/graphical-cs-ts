import React, { useState, useEffect } from 'react'
import { Graph } from '../Graph';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@rmwc/button';
import * as graphActionType from 'redux/BFS/graph/graphActionType';
import { BfsRootReducer } from 'Interfaces/BfsRootReducer';
import { useTransition, animated } from '@react-spring/konva';
import { Snackbar } from '@rmwc/snackbar';
import { ThemeProvider, Theme } from '@rmwc/theme';

import '@rmwc/button/styles';
import '@rmwc/theme/styles';
import './Search.css';

export const SearchView = () => {
    const dispatch = useDispatch();
    const searchTrackGlobal = useSelector((state: BfsRootReducer) => state.graph.searchTrack);
    const nodeList = useSelector((state: BfsRootReducer) => state.graph.nodeList);
    const graph = useSelector((state: BfsRootReducer) => state.graph);
    const [track, setTrack] = useState<number[][]>([]);
    const [index, setIndex] = useState<number>(0);
    const [pathFound, setPathFound] = useState<boolean>(false);
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
                    if (neighborIndex === graph.destinationNodeIndex) setPathFound(true);
                });
                setIndex(nodeIndex + 1);
            }
        }
    }

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
        <div className='search-page'>
            <Button label='quit' onClick={quieSearchViewHandler} />
            <Button label={track.length > 0 ? 'next step' : 'start search'} onClick={searchHandler} />
            <ThemeProvider
                options={{
                    primaryBg: graph.rootFill
                }}
            >
                <Theme use={['primaryBg']}>
                    <Snackbar
                        open={pathFound}
                        message='Path Found'
                    />
                </Theme>
            </ThemeProvider>
            <Graph>
                {transition(style => (
                    <animated.Line {...style} stroke={graph.rootFill} strokeWidth={5.5} />
                ))}
            </Graph>
        </div>
    )
}
