import React from 'react';
import { Elevation } from '@rmwc/elevation';
import { nodeListStateInterface } from '../../Interfaces/nodeListStateInterface';
import { EdgeListInterface } from '../../Interfaces/EdgeListInterface';
import { useTransition, animated } from 'react-spring';

import '@rmwc/elevation/styles';

export type NodeNeighborListProps = {
    edgeList: EdgeListInterface[],
    nodeList: nodeListStateInterface[],
    currentNodeIndex: number,
    currentNeighborIndex: number,
    onMouseEnter: (index: number) => void,
    onMouseLeave: (index: number) => void,
    onClick: (index: number) => void
}

// export interface colorStateInterface {
//     backgroundColor: string,
//     textColor: string
// }

const NodeNeighborList = (props: NodeNeighborListProps) => {
    const { edgeList, nodeList, currentNodeIndex, currentNeighborIndex, onMouseEnter, onMouseLeave, onClick } = props;
    // const [colorState, setColorState] = useState<colorStateInterface>({
    //     backgroundColor: 'white',
    //     textColor: 'black'
    // });



    const transition = useTransition(edgeList, edge => edge.index, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    });

    return (
        <div className="neighbor-list">
            {transition.map(({ item, key, props }) => {
                let neighborNodeIndex = -1;
                if (item.edge[0] === nodeList[currentNodeIndex].index)
                    neighborNodeIndex = 1;

                if (item.edge[1] === nodeList[currentNodeIndex].index)
                    neighborNodeIndex = 0;

                if (neighborNodeIndex !== -1) {
                    let neighborNodeIndexOriginal = -1;

                    for (let i = 0; i < nodeList.length; i++) {
                        if (nodeList[i].index === item.edge[neighborNodeIndex])
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
                        <animated.div style={props} key={key}>
                            <Elevation
                                style={{
                                    paddingTop: '1%',
                                    backgroundColor: backgroundColor,
                                    color: textColor
                                }}
                                key={key}
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
                                <p>{item.edge[neighborNodeIndex]}</p>
                            </Elevation>
                        </animated.div>
                    );
                }

                return null;
            })
            }
        </div>
    );
}

export default NodeNeighborList;