import React from 'react';
import { Elevation } from '@rmwc/elevation';
import { nodeListStateInterface } from '../../nodeListStateInterface';

import '@rmwc/elevation/styles';

export type NodeNeighborListProps = {
    neighborList: number[][],
    nodeList: nodeListStateInterface[],
    currentNodeIndex: number,
    currentNeighborIndex: number,
    onMouseEnter: (index: number) => void,
    onMouseLeave: (index: number) => void,
    onClick: (index: number) => void
}

export interface colorStateInterface {
    backgroundColor: string,
    textColor: string
}

const NodeNeighborList = (props: NodeNeighborListProps) => {
    const { neighborList, nodeList, currentNodeIndex, currentNeighborIndex, onMouseEnter, onMouseLeave, onClick } = props;
    // const [colorState, setColorState] = useState<colorStateInterface>({
    //     backgroundColor: 'white',
    //     textColor: 'black'
    // });

    return (
        <div className="neighbor-list">
            {neighborList.map((nodePair, index) => {
                let neighborNodeIndex = -1;
                if (nodePair[0] === nodeList[currentNodeIndex].index)
                    neighborNodeIndex = 1;

                if (nodePair[1] === nodeList[currentNodeIndex].index)
                    neighborNodeIndex = 0;

                if (neighborNodeIndex !== -1) {
                    let neighborNodeIndexOriginal = -1;

                    for (let i = 0; i < nodeList.length; i++) {
                        if (nodeList[i].index === nodePair[neighborNodeIndex])
                            neighborNodeIndexOriginal = i;
                    }

                    const backgroundColor = currentNeighborIndex === neighborNodeIndexOriginal ? 'red' : 'white';
                    const textColor = currentNeighborIndex === neighborNodeIndexOriginal ? 'white' : 'black';

                    // setColorState(prevState => {
                    //     return {
                    //         ...prevState,
                    //         backgroundColor: currentNeighborIndex === neighborNodeIndexOriginal ? 'red' : 'white',
                    //         textColor: currentNeighborIndex === neighborNodeIndexOriginal ? 'white' : 'black'
                    //     }
                    // });

                    return (
                        <Elevation
                            style={{
                                backgroundColor: backgroundColor,
                                color: textColor
                            }}
                            key={index}
                            z={2}
                            className="neighbor-node"
                            onMouseEnter={() => {
                                // setColorState(prevState => {
                                //     return {
                                //         ...prevState,
                                //         backgroundColor: 'red',
                                //         textColor: 'white'
                                //     }
                                // })
                                onMouseEnter(neighborNodeIndexOriginal)
                            }}
                            onMouseLeave={() => {
                                // setColorState(prevState => {
                                //     return {
                                //         ...prevState,
                                //         backgroundColor: currentNeighborIndex === neighborNodeIndexOriginal ? 'red' : 'white',
                                //         textColor: currentNeighborIndex === neighborNodeIndexOriginal ? 'white' : 'black'
                                //     }
                                // })
                                onMouseLeave(neighborNodeIndexOriginal)
                            }}
                            onClick={() => {
                                onClick(neighborNodeIndexOriginal);
                            }}
                        >
                            <p>{nodePair[neighborNodeIndex]}</p>
                        </Elevation>
                    );
                }

                return null;
            })
            }
        </div>
    );
}

export default NodeNeighborList;