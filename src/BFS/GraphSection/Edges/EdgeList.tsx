import React, { useRef, useState } from 'react';
import { Line } from 'react-konva';
import { useTransition, animated } from '@react-spring/konva';
import { useSelector, useDispatch } from 'react-redux';
import { bfsRootReducerInterface } from '../../../redux/BFS/store/rootReducer';
import * as graphActionType from '../../../redux/BFS/store/graph/graphActionType';
import Konva from 'konva';

const EdgeList = () => {
    const edgeList = useSelector((state: bfsRootReducerInterface) => state.graph.edgeList);
    const nodeList = useSelector((state: bfsRootReducerInterface) => state.graph.nodeList);
    const dispatch = useDispatch();

    const lineRef = useRef() as React.MutableRefObject<Konva.Line>;

    const onMouseEnterHandler = (index: number) => {
        dispatch({ type: graphActionType.MOUSE_ENTER_EDGE, payload: { index, ref: lineRef } });

        setTimeout(() => {
            if (lineRef.current) {
                lineRef.current.to({
                    shadowBlur: 7,
                    duration: 0.1
                });
            }
        }, 0)

    }

    const onMouseLeaveHandler = (index: number) => {
        if (lineRef.current) {
            lineRef.current.to({
                shadowBlur: 2,
                duration: 0.15
            });
        }

        dispatch({ type: graphActionType.MOUSE_LEAVE_EDGE, payload: { index } });
    }

    // const transition = useTransition(edgeList, edge => edge.key, {
    //     from: edge => [{}],

    // });

    return (
        <React.Fragment>
            {edgeList.length !== 0 &&
                edgeList.map((edge, index) => {
                    let locationVector: number[] = [];
                    if (nodeList[edge.edge[0]] && nodeList[edge.edge[1]]) {
                        const x1 = nodeList[edge.edge[0]].xPosition;
                        const y1 = nodeList[edge.edge[0]].yPosition;
                        const x2 = nodeList[edge.edge[1]].xPosition;
                        const y2 = nodeList[edge.edge[1]].yPosition;
                        locationVector = [x1, y1, x2, y2];
                    }

                    return (
                        locationVector &&
                        <Line
                            points={locationVector}
                            stroke='black'
                            strokeWidth={4}
                            shadowBlur={2}
                            onClick={() => dispatch({ type: graphActionType.CLICK_EDGE, payload: { index } })}
                            onMouseEnter={() => onMouseEnterHandler(index)}
                            onMouseLeave={() => onMouseLeaveHandler(index)}
                            ref={edgeList[index].ref}
                        />
                    );
                })
            }
        </React.Fragment>
    );
}

export default EdgeList;