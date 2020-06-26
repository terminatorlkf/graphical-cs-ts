import React, { useRef } from 'react'
import { Elevation } from '@rmwc/elevation';
import { Button } from '@rmwc/button';
import { useSelector, useDispatch } from 'react-redux';
import { Queue } from 'queue-typescript';
import * as graphActionType from '../../redux/BFS/graph/graphActionType';
import { BfsRootReducer } from '../../Interfaces/BfsRootReducer';
import { Link } from 'react-router-dom';

import '@rmwc/elevation/styles';
import '@rmwc/button/styles';

export type parentTrack = {
    parentNodeIndex: number,
    searchedNeighbor: number[]
}

export const Config: React.FunctionComponent = ({ children }) => {

    const rootButtonRef = useRef() as React.RefObject<HTMLButtonElement>;
    const destinationButtonRef = useRef() as React.RefObject<HTMLButtonElement>;
    const searchButtonRef = useRef() as React.RefObject<HTMLButtonElement>;

    const graph = useSelector((state: BfsRootReducer) => state.graph);
    const dispatch = useDispatch();

    const rootNodeIndex = graph.rootNodeIndex;
    const destinationNodeIndex = graph.destinationNodeIndex;

    const setRootHandler = () => {
        setTimeout(() => {
            rootButtonRef.current?.blur();
        }, 340);

        dispatch({ type: graphActionType.SET_ROOT, payload: { index: graph.currentNodeIndex } });
    }

    const setDestinationHandler = () => {
        setTimeout(() => {
            destinationButtonRef.current?.blur();
        }, 340);

        dispatch({ type: graphActionType.SET_DESTINATION, payload: { index: graph.currentNodeIndex } });
    }

    const clickSearchButtonHandler = () => {
        console.log(bfsSearch());
    }

    const bfsSearch = () => {
        setTimeout(() => {
            searchButtonRef.current?.blur();
        }, 335);

        const nodeList = graph.nodeList;
        const start = graph.rootNodeIndex;
        const dest = graph.destinationNodeIndex;

        let parentTrackList: parentTrack[] = [];

        let queue = new Queue<number[]>();
        let visited: number[] = [];
        queue.enqueue([start]);

        while (1) {
            let currentNodePath = queue.dequeue();
            let currentNodeIndex = currentNodePath[currentNodePath.length - 1];
            let curretnNeighborList = nodeList[currentNodeIndex].neighborList;
            if (currentNodeIndex === dest) return [parentTrackList, currentNodePath];
            if (visited.includes(currentNodeIndex)) continue;
            visited.push(currentNodeIndex);
            parentTrackList.push({ parentNodeIndex: currentNodeIndex, searchedNeighbor: [...curretnNeighborList] });
            curretnNeighborList.forEach(nodeIndex => {
                queue.enqueue([...currentNodePath, nodeIndex]);
            });
        }

    }

    return (
        <div className="search-status-stack">
            <div className='vertical-border' />
            <Elevation className='search-status-stack-card' z={0} >
                <h2>Config</h2>
                <p>current root: {rootNodeIndex === -1 ? 'null' : `node ${rootNodeIndex}`}</p>
                <p>current destination: {destinationNodeIndex === -1 ? 'null' : `node ${destinationNodeIndex}`}</p>
                {graph.rootNodeIndex !== -1 && graph.destinationNodeIndex !== -1 &&
                    <Link to='/search'>
                        <Button ref={searchButtonRef} onClick={() => { dispatch({ type: graphActionType.TOGGLE_SEARCH }) }} label='start search' style={{ width: '8.1rem' }} />
                    </Link>
                }

                {graph.nodeStatusCardToggled &&
                    <div className='action'>
                        <Button ref={rootButtonRef} onClick={setRootHandler} label='set as root' />
                        <Button ref={destinationButtonRef} onClick={setDestinationHandler} label='set as destination' />
                    </div>
                }
                {children}
            </Elevation>

            <style jsx>
                {`
                .search-status-stack {
                    height: 100vh;
                    background-color: #F5F5F5;
                    display: flex;
                    flex-direction: row;
                }
                
                .search-status-stack-card {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    height: 40rem;
                    width: 25rem; 
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    padding: 0.5rem 2rem 1rem 1.5rem;
                }

                .action {
                    display: flex;
                    flex-direction: row;
                }
                .
                `}
            </style>
        </div>
    )
}