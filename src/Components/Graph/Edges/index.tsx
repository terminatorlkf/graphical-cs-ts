import React from 'react';
import { useSelector } from 'react-redux';
import { BfsRootReducer } from '../../../Interfaces/BfsRootReducer';
import { animated, useTransition } from '@react-spring/konva';
import { Edge } from 'Interfaces/Edge';

export const Edges = () => {
    const edgeList = useSelector((state: BfsRootReducer) => state.graph.edgeList);
    const nodeList = useSelector((state: BfsRootReducer) => state.graph.nodeList);

    const transition = useTransition(edgeList, {
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
            console.log('[ ' + nodeList[edge.edge[0]].xPosition + ', ' + nodeList[edge.edge[0]].yPosition + ', ' + nodeList[edge.edge[1]].xPosition + ', ' + nodeList[edge.edge[1]].yPosition + ' ]');
            return nodeList[edge.edge[0]] && nodeList[edge.edge[1]] && {
                points: [nodeList[edge.edge[0]].xPosition,
                nodeList[edge.edge[0]].yPosition,
                nodeList[edge.edge[1]].xPosition,
                nodeList[edge.edge[1]].yPosition],
                c: 1,
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
        },
        keys: (edge: Edge) => edge.key
    });

    const edgeFragment = transition((style, item) => (
        <animated.Line
            key={item.key}
            {...style}
            stroke={style.c
                .interpolate([0, 0.5, 0.75, 1], [0, 255, 150, 0])
                .interpolate(c => `rgba(${c}, 0, 0, 1`)}
            strokeWidth={4}
        />
    ));

    return (
        <React.Fragment>
            {edgeList.length !== 0 && edgeFragment}
        </React.Fragment>
    );
}