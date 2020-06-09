import React from 'react';
import { useSelector } from 'react-redux';
import { bfsRootReducerInterface } from '../../../redux/BFS/store/rootReducer';
import { animated, useTransition } from '@react-spring/konva';

const EdgeList = () => {
    const edgeList = useSelector((state: bfsRootReducerInterface) => state.graph.edgeList);
    const nodeList = useSelector((state: bfsRootReducerInterface) => state.graph.nodeList);

    const transition = useTransition(edgeList, edgeList => edgeList.key, {
        from: edge => {
            return nodeList[edge.edge[0]] && nodeList[edge.edge[1]] && {
                points: [nodeList[edge.edge[0]].xPosition,
                nodeList[edge.edge[0]].yPosition,
                nodeList[edge.edge[0]].xPosition,
                nodeList[edge.edge[0]].yPosition]
            }
        },
        enter: edge => {
            return nodeList[edge.edge[0]] && nodeList[edge.edge[1]] && {
                points: [nodeList[edge.edge[0]].xPosition,
                nodeList[edge.edge[0]].yPosition,
                nodeList[edge.edge[1]].xPosition,
                nodeList[edge.edge[1]].yPosition]
            }
        },
        update: edge => {
            return nodeList[edge.edge[0]] && nodeList[edge.edge[1]] && {
                points: [nodeList[edge.edge[0]].xPosition,
                nodeList[edge.edge[0]].yPosition,
                nodeList[edge.edge[1]].xPosition,
                nodeList[edge.edge[1]].yPosition],
                config: { duration: 1 }
            }
        },
        leave: edge => {
            return nodeList[edge.edge[0]] && nodeList[edge.edge[1]] && {
                points: [nodeList[edge.edge[0]].xPosition,
                nodeList[edge.edge[0]].yPosition,
                nodeList[edge.edge[0]].xPosition,
                nodeList[edge.edge[0]].yPosition]
            }
        }
    });

    return (
        <React.Fragment>
            {edgeList.length !== 0 &&
                transition.map(({ key, props }) => {
                    return (
                        <animated.Line
                            key={key}
                            {...props}
                            // points={locationVector}
                            stroke='black'
                            strokeWidth={4}
                        />
                    );
                })
            }
        </React.Fragment>
    );
}

export default EdgeList;