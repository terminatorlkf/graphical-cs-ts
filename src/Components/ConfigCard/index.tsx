import React, { useRef } from 'react'
import { Elevation } from '@rmwc/elevation';
import { Button } from '@rmwc/button';
import { useSelector, useDispatch } from 'react-redux';
import { Queue } from 'queue-typescript';
import * as graphActionType from '../../redux/BFS/graph/graphActionType';
import { BfsRootReducer } from '../../Interfaces/BfsRootReducer';

import '@rmwc/elevation/styles';
import '@rmwc/button/styles';
import { Theme } from '@rmwc/theme';

export type parentTrack = {
    parentNodeIndex: number,
    searchedNeighbor: number[]
}

export const ConfigCard: React.FunctionComponent = ({ children }) => {

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
        dispatch({ type: graphActionType.TOGGLE_SEARCH_MODE });
        dispatch({ type: graphActionType.START_BFS_SEARCH });
    }

    return (
        <div className="search-status-stack">
            <Elevation className='config-card' z={1} >
                <div>
                    <p><strong>Config</strong></p>
                </div>

                <div className='config-card-body'>
                    <p>root: {rootNodeIndex === -1 ? 'null' : `node ${rootNodeIndex}`}</p>
                    <p>destination: {destinationNodeIndex === -1 ? 'null' : `node ${destinationNodeIndex}`}</p>

                    {graph.nodeStatusCardToggled &&
                        <div className='action'>
                            <Button ref={rootButtonRef} onClick={setRootHandler} label='set as root' />
                            <Button ref={destinationButtonRef} onClick={setDestinationHandler} label='set as destination' />
                        </div>
                    }

                    {graph.rootNodeIndex !== -1 && graph.destinationNodeIndex !== -1 &&
                        <Button ref={searchButtonRef} onClick={clickSearchButtonHandler} label='start' style={{ width: '3rem' }} />
                    }
                </div>


            </Elevation>
            {children}

            <style jsx>
                {`
                p {
                    margin-top: 0;
                    margin-bottom: 0;
                }

                .search-status-stack {
                    position: relative;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                }
                
                .config-card {
                    overflow: hidden;
                    background-color: rgba(50, 50, 50, 1);
                    color: white;
                    min-width: 30rem;
                    height: auto;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    border-radius: 0.2rem;
                    margin-top: 1rem;
                    padding: 0.5rem 1rem 0.5rem 1rem;
                }

                .config-card-body {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    min-width: 25rem;
                    justify-content: space-between;
                }

                .action {
                    display: flex;
                    flex-direction: row;
                }
                
                `}
            </style>
        </div>
    )
}