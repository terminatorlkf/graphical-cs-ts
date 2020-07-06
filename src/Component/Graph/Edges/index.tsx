import React from 'react';
import { useSelector } from 'react-redux';
import { BfsRootReducer } from '../../../Interfaces/BfsRootReducer';
import { animated, useTransition } from '@react-spring/konva';

export const Edges = () => {
    const edgeList = useSelector((state: BfsRootReducer) => state.graph.edgeList);
    const nodeList = useSelector((state: BfsRootReducer) => state.graph.nodeList);

    const transition = useTransition(edgeList, edgeList => edgeList.key, {
        from: edge => {
            return nodeList[edge.edge[0]] && nodeList[edge.edge[1]] && {
                points: [nodeList[edge.edge[0]].xPosition,
                nodeList[edge.edge[0]].yPosition,
                nodeList[edge.edge[0]].xPosition,
                nodeList[edge.edge[0]].yPosition],
                c: 0
            }
        },
        enter: edge => {
            return nodeList[edge.edge[0]] && nodeList[edge.edge[1]] && {
                points: [nodeList[edge.edge[0]].xPosition,
                nodeList[edge.edge[0]].yPosition,
                nodeList[edge.edge[1]].xPosition,
                nodeList[edge.edge[1]].yPosition],
                c: 1
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
                nodeList[edge.edge[0]].yPosition],
                c: 0
            }
        }, 
        config: { 
            mass: 2,
            tension: 170,
            friction: 42
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
                            stroke={props.c
                                .interpolate([0, 0.5, 0.75, 1],[0, 255, 150, 0])
                                .interpolate(c => `rgba(${c}, 0, 0, 1`)}
                            strokeWidth={4}
                        />
                    );
                })
            }
        </React.Fragment>
    );
}