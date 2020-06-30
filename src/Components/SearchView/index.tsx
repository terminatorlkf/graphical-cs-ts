import React, { useState } from 'react'
import { Graph } from '../Graph';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@rmwc/button';
import * as graphActionType from 'redux/BFS/graph/graphActionType';
import { BfsRootReducer } from 'Interfaces/BfsRootReducer';
import { ParentTrack } from 'Interfaces/SearchTrack';
import { Line } from 'react-konva';

import '@rmwc/button/styles';
import './Search.css';

export const SearchView = () => {
    const dispatch = useDispatch();
    const searchTrackGlobal = useSelector((state: BfsRootReducer) => state.graph.searchTrack);
    const [track, setTrack] = useState<ParentTrack[] | null>(null);

    const searchHandler = () => {
        if (track === null) {
            dispatch({ type: graphActionType.START_BFS_SEARCH });
            if (searchTrackGlobal) {
                setTrack([searchTrackGlobal.parentTrackList[0]]);
            }
        } 

    }

    return (
        <div className='search-page'>
            <Button label='quit' onClick={() => { dispatch({ type: graphActionType.TOGGLE_SEARCH_MODE }) }} />
            <Button label={track ? 'next step' : 'start search'} onClick={searchHandler} />
            <Graph>

            </Graph>
        </div>
    )
}
