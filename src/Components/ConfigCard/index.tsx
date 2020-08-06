import React, { useRef } from 'react'
import { Elevation } from '@rmwc/elevation';
import { Button } from '@rmwc/button';
import { useSelector, useDispatch } from 'react-redux';
import * as graphActionType from '../../redux/BFS/graph/graphActionType';
import { BfsRootReducer } from '../../Interfaces/BfsRootReducer';

import '@rmwc/elevation/styles';
import '@rmwc/button/styles';
import { ThemeProvider } from '@rmwc/theme';

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
                    <div className='status'>
                        <span className='circle' id='green' />
                        <p>root: {rootNodeIndex === -1 ? 'null' : `node ${rootNodeIndex}`}</p>
                    </div>
                    <div className='status'>
                        <span className='circle' id='red' />
                        <p>destination: {destinationNodeIndex === -1 ? 'null' : `node ${destinationNodeIndex}`}</p>
                    </div>

                    {graph.nodeStatusCardToggled &&
                        <div className='action'>
                            <Button ref={rootButtonRef} onClick={setRootHandler} label='set as root' />
                            <Button ref={destinationButtonRef} onClick={setDestinationHandler} label='set as destination' />
                        </div>
                    }

                    {graph.rootNodeIndex !== -1 && graph.destinationNodeIndex !== -1 &&
                        <ThemeProvider
                            options={{
                                primary: '#4CAF50',
                                secondary: 'blue'
                            }}
                        >
                            <Button ref={searchButtonRef} onClick={clickSearchButtonHandler} label='start' style={{ width: '3rem' }} />
                        </ThemeProvider>
                    }
                </div>


            </Elevation>
            {children}

            <style jsx>
                {`
                p {
                    margin-top: 0;
                    margin-bottom: 0;
                    padding-bottom: 0.1rem;
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
                    background-color: #424242;
                    color: white;
                    min-width: 33rem;
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
                    min-width: 27rem;
                    justify-content: space-between;
                }

                .status {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }

                .action {
                    display: flex;
                    flex-direction: row;
                }

                .circle {
                    width: 0.5rem;
                    height: 0.5rem;
                    border-radius: 50%;
                    margin-right: 0.5rem;
                    margin-top: 0.1rem;
                }

                #red {
                    background-color: #D32F2F;
                }

                #green {
                    background-color: #4CAF50;
                }
                
                `}
            </style>
        </div>
    )
}