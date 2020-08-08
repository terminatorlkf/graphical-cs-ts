import React from 'react';
import { useSelector } from 'react-redux';
import { Edge } from 'Interfaces/Edge';
import { BfsRootReducer } from 'Interfaces/BfsRootReducer';
import { animated, useTransition } from '@react-spring/konva';

export const Edges = () => {
    const graph = useSelector((state: BfsRootReducer) => state.graph);
    const edgeList = useSelector((state: BfsRootReducer) => state.graph.edgeList);
    const nodeList = useSelector((state: BfsRootReducer) => state.graph.nodeList);

    const edgeIndexList: Edge[] = edgeList.map((edge, index) => {
        let firstIndex = 0;
        let secondIndex = 0;
        if (nodeList[edge.edge[0]] && edge.edge[0] === nodeList[edge.edge[0]].index) firstIndex = edge.edge[0];
        else {
            nodeList.map((node, index) => {
                if (node.index === edge.edge[0]) firstIndex = index;
            });
        }

        if (nodeList[edge.edge[1]] && edge.edge[1] === nodeList[edge.edge[1]].index) secondIndex = edge.edge[1];
        else {
            nodeList.map((node, index) => {
                if (node.index === edge.edge[1]) secondIndex = index;
            });
        }

        return {
            key: index,
            edge: [firstIndex, secondIndex]
        }
    });

    const transition = useTransition(edgeIndexList, {
        key: edgeIndex => edgeIndex.key,
        from: edge => {
            return nodeList[edge.edge[0]] && nodeList[edge.edge[1]] && {
                points: [nodeList[edge.edge[0]].xPosition,
                nodeList[edge.edge[0]].yPosition,
                nodeList[edge.edge[0]].xPosition,
                nodeList[edge.edge[0]].yPosition],
                cancel: false,
                c: 0
            }
        },
        enter: edge => {
            return nodeList[edge.edge[0]] && nodeList[edge.edge[1]] && {
                points: [nodeList[edge.edge[0]].xPosition,
                nodeList[edge.edge[0]].yPosition,
                nodeList[edge.edge[1]].xPosition,
                nodeList[edge.edge[1]].yPosition],
                c: 1,
            }
        },
        update: edge => {
            return nodeList[edge.edge[0]] && nodeList[edge.edge[1]] && graph.updateNodePositionMode && {
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