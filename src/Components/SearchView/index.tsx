import React, { useState } from 'react'
import { Graph } from '../Graph';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@rmwc/button';
import * as graphActionType from 'redux/BFS/graph/graphActionType';
import { BfsRootReducer } from 'Interfaces/BfsRootReducer';
import { ParentTrack } from 'Interfaces/SearchTrack';
import { useTransition, animated } from '@react-spring/konva';

import '@rmwc/button/styles';
import './Search.css';

export const SearchView = () => {
    const dispatch = useDispatch();
    const searchTrackGlobal = useSelector((state: BfsRootReducer) => state.graph.searchTrack);
    const [track, setTrack] = useState<ParentTrack[]>([]);
    const [index, setIndex] = useState<number>(0);

    const searchHandler = () => {
        if (index < searchTrackGlobal.parentTrackList.length) {
            setTrack(prevState => [...prevState, searchTrackGlobal.parentTrackList[index]]);
            setIndex(prevState => prevState + 1);
        }
    }

    // const transition = useTransition(track, track => track.key, {});

    return (
        <div className='search-page'>
            <Button label='quit' onClick={() => { dispatch({ type: graphActionType.TOGGLE_SEARCH_MODE }) }} />
            <Button label={track ? 'next step' : 'start search'} onClick={searchHandler} />
            <Graph>
                <animated.Line />
            </Graph>
        </div>
    )
}
