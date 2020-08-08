import React from 'react';
import { useSelector } from 'react-redux';
import { Edge } from 'Interfaces/Edge';
import { Node } from 'Interfaces/Node';
import { BfsRootReducer } from 'Interfaces/BfsRootReducer';
import { animated, useTransition } from '@react-spring/konva';
import { Line } from 'react-konva';

export const Edges = () => {
    const graph = useSelector((state: BfsRootReducer) => state.graph);
    const edgeList = useSelector((state: BfsRootReducer) => state.graph.edgeList);
    const nodeList = useSelector((state: BfsRootReducer) => state.graph.nodeList);

    const findPoints = (edge: Edge, nodeList: Node[]) => {
        const firstNodeIndex = edge.edge[0];
        const secondNodeIndex = edge.edge[1];

        let points = [0, 0, 0, 0];

        nodeList.map(node => {
            if (node.index === firstNodeIndex) {
                points[0] = node.xPosition;
                points[1] = node.yPosition;
            }

            if (node.index === secondNodeIndex) {
                points[2] = node.xPosition;
                points[3] = node.yPosition;
            }
        });

        return points;
    }

    const transition = useTransition(edgeList, {
        key: edge => edge.key,
        from: edge => {
            const points = findPoints(edge, nodeList);
            return {
                points: [points[0], points[1], points[0], points[1]],
                cancel: false,
                c: 0
            }
        },
        enter: edge => {
            const points = findPoints(edge, nodeList);
            return {
                points,
                c: 1,
            }
        },
        update: edge => {
            const points = findPoints(edge, nodeList);
            return graph.updateNodePositionMode && {
                points,
                config: { duration: 1 }
            }
        },
        leave: edge => {
            const points = findPoints(edge, nodeList);
            return {
                points: [points[0], points[1], points[0], points[1]],
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
            {edgeList.length !== 0 && transition(style => (
                <animated.Line
                    {...style}
                    stroke={style.c
                        .interpolate([0, 0.5, 0.75, 1], [0, 255, 150, 0])
                        .interpolate(c => `rgba(${c}, 0, 0, 1`)}
                    strokeWidth={4}
                />
            ))}
        </React.Fragment>
    );
}