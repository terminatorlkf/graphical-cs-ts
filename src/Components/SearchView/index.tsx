import React, { useState } from 'react'
import { Graph } from '../Graph';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@rmwc/button';
import * as graphActionType from 'redux/BFS/graph/graphActionType';
import { BfsRootReducer } from 'Interfaces/BfsRootReducer';
import { useTransition, animated } from '@react-spring/konva';

import '@rmwc/button/styles';
import './Search.css';

export const SearchView = () => {
    const dispatch = useDispatch();
    const searchTrackGlobal = useSelector((state: BfsRootReducer) => state.graph.searchTrack);
    const nodeList = useSelector((state: BfsRootReducer) => state.graph.nodeList);
    const graph = useSelector((state: BfsRootReducer) => state.graph);
    const [track, setTrack] = useState<number[][]>([]);
    const [index, setIndex] = useState<number>(0);
    const parentNodeIndex = searchTrackGlobal.parentTrackList[index].parentNodeIndex;

    const searchHandler = () => {
        if (index < searchTrackGlobal.parentTrackList.length) {
            searchTrackGlobal.parentTrackList[index].searchedNeighbor.map(neighborIndex => {
                setTrack(prevState => [...prevState, [parentNodeIndex, neighborIndex]]);
                return null;
            });
            setIndex(prevState => prevState + 1);
            console.log(track);
        }
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
            <Button label='quit' onClick={() => { dispatch({ type: graphActionType.TOGGLE_SEARCH_MODE }) }} />
            <Button label={track.length > 0 ? 'next step' : 'start search'} onClick={searchHandler} />
            <Graph>
                {transition(style => (
                    <animated.Line {...style} stroke={graph.rootFill} strokeWidth={5.5} />
                ))}
            </Graph>
        </div>
    )
}
