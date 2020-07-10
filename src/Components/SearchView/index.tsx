import React, { useState } from 'react'
import { Graph } from '../Graph';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@rmwc/button';
import * as graphActionType from 'redux/BFS/graph/graphActionType';
import { BfsRootReducer } from 'Interfaces/BfsRootReducer';
import { useTransition, animated } from '@react-spring/konva';
import { Circle } from 'react-konva';

import '@rmwc/button/styles';
import './Search.css';

export const SearchView = () => {
    const dispatch = useDispatch();
    const searchTrackGlobal = useSelector((state: BfsRootReducer) => state.graph.searchTrack);
    const nodeList = useSelector((state: BfsRootReducer) => state.graph.nodeList);
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
            return {
                points: [
                    nodeList[nodePair[0]].xPosition,
                    nodeList[nodePair[0]].yPosition,
                    nodeList[nodePair[0]].xPosition,
                    nodeList[nodePair[0]].yPosition,
                ]
            }
        },
        enter: nodePair => {
            console.log(nodeList[nodePair[0]]);
            console.log(nodeList[nodePair[1]]);
            return {
                points: [
                    nodeList[nodePair[0]].xPosition,
                    nodeList[nodePair[0]].yPosition,
                    nodeList[nodePair[1]].xPosition,
                    nodeList[nodePair[1]].yPosition,
                ]
            }
        },
        leave: nodePair => {
            console.log('leave');
            return {
                points: [
                    nodeList[nodePair[0]].xPosition,
                    nodeList[nodePair[0]].yPosition,
                    nodeList[nodePair[0]].xPosition,
                    nodeList[nodePair[0]].yPosition,
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
                    <animated.Line {...style} stroke='red' strokeWidth={4} />
                ))}
            </Graph>
        </div>
    )
}
