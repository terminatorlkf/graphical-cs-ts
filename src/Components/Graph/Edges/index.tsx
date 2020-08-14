import React from 'react';
import { Edge } from 'Interfaces/Edge';
import { Node } from 'Interfaces/Node';
import { GraphState } from 'Interfaces/GraphState';
import { animated, useTransition } from '@react-spring/konva';
import { IEdges } from './Edges';

export const Edges: React.FunctionComponent<IEdges.IProps>= ({nodeList, edgeList, graph}) => {


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
            return null;
        });

        return points;
    }

    const findLeavePoints = (edge: Edge, nodeList: Node[], graph: GraphState) => {
        const lastDeletedNode = graph.lastDeletedNode;
        const firstIndex = edge.edge[0];
        const secondIndex = edge.edge[1];
        let points = [0, 0];

        if (lastDeletedNode) {
            if (lastDeletedNode.neighborList.includes(firstIndex)) {
                nodeList.map(node => {
                    if (node.index === firstIndex) points = [node.xPosition, node.yPosition];
                    return null;
                });
            }

            if (lastDeletedNode.neighborList.includes(secondIndex)) {
                nodeList.map(node => {
                    if (node.index === secondIndex) points = [node.xPosition, node.yPosition];
                    return null;
                });
            }
            
        } else
            points = [nodeList[graph.currentNodeIndex].xPosition, nodeList[graph.currentNodeIndex].yPosition];

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
            if (graph) {
                const points = findPoints(edge, nodeList);
                return graph.updateNodePositionMode && {
                    points,
                    config: { duration: 1 }
                }
            }
        },
        leave: edge => {
            if (graph) {
                const points = findLeavePoints(edge, nodeList, graph);
                return {
                    points: [points[0], points[1], points[0], points[1]],
                    c: 0
                }
            } else {
                const points = findPoints(edge, nodeList);
                return {
                    points: [points[0], points[1], points[0], points[1]],
                    cancel: false,
                    c: 0
                }
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
                        .to([0, 0.5, 0.75, 1], [0, 255, 150, 0])
                        .to(c => `rgba(${c}, 0, 0, 1`)}
                    strokeWidth={4}
                />
            ))}
        </React.Fragment>
    );
}