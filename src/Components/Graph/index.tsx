import React, { useRef } from 'react';
import { Stage, Layer, Text } from "react-konva";
import { Edges } from './Edges';
import { useSelector, useDispatch, useStore, Provider } from 'react-redux';
import { useTransition, animated } from '@react-spring/konva';
import * as graphActionType from 'redux/BFS/graph/graphActionType';
import { BfsRootReducer } from 'Interfaces/BfsRootReducer';
import { IGraph } from './Graph';
import { KonvaEventObject } from 'konva/types/Node';
import Konva from 'konva';

export const Graph: React.FunctionComponent<IGraph.IProps> = ({ draggable, width, height, clickable, children }) => {
    const dispatch = useDispatch();
    const nodeList = useSelector((state: BfsRootReducer) => state.graph.nodeList);
    const graph = useSelector((state: BfsRootReducer) => state.graph);
    const store = useStore();
    const nodeRef = useRef() as React.MutableRefObject<Konva.Circle>;

    const transition = useTransition(nodeList, {
        key: node => node.index,
        from: { o: 0, r: 0 },
        enter: node => {
            let nodeFill = node.fill;
            if (node.index === graph.rootNodeIndex) nodeFill = graph.rootFill;
            if (node.index === graph.destinationNodeIndex) nodeFill = graph.destinationFill;
            return { o: 1, r: 1, fill: nodeFill }
        },
        leave: { o: 0, r: 1 },
        update: node => {
            let nodeFill = node.fill;
            if (graph.searchMode) {
                if (!((node.index === graph.rootNodeIndex && !node.visited) || (node.index === graph.destinationNodeIndex && !node.visited))) {
                    return node.visited ? { r: 0.85, fill: graph.rootFill } : { r: 1, fill: graph.defaultFill }
                }
            } else {
                if (!node.ref) {
                    if (node.index === graph.rootNodeIndex) nodeFill = graph.rootFill;
                    if (node.index === graph.destinationNodeIndex) nodeFill = graph.destinationFill;
                    return { r: 1, fill: nodeFill }
                } else {
                    return { r: 0.69, fill: graph.clickedFill }
                }
            }
        }
    })

    const mouseEnterHandler = (index: number) => {
        dispatch({ type: graphActionType.MOUSE_ENTER_NODE, payload: { index, ref: nodeRef } });
        dispatch({ type: graphActionType.TOGGLE_UPDATE_NODE_POSITION_MODE, payload: { isOn: true } });
    }

    const mouseLeaveHandler = (index: number) => {
        dispatch({ type: graphActionType.MOUSE_LEAVE_NODE, payload: { index } });
        dispatch({ type: graphActionType.TOGGLE_UPDATE_NODE_POSITION_MODE, payload: { isOn: false } });
    }

    return (
        <div className="operation-node-section">
            <Stage width={width} height={height} draggable>
                <Provider store={store}>
                    <Layer>
                        <Edges />
                        {children}

                        {transition((style, node, t, index) => {
                            if (node.index !== -1) {
                                return (
                                    <animated.Group
                                        key={index}
                                        x={node.xPosition}
                                        y={node.yPosition}
                                        draggable={draggable ? true : false}
                                        onClick={() => clickable && dispatch({ type: graphActionType.CLICK_NODE, payload: { index } })}
                                        onMouseEnter={() => draggable && mouseEnterHandler(index)}
                                        onMouseLeave={() => draggable && mouseLeaveHandler(index)}
                                        onDragMove={(e: KonvaEventObject<DragEvent>) => draggable && dispatch({ type: graphActionType.DRAG_NODE, payload: { index, e } })}
                                        opacity={style.o.to(o => o)}
                                    >
                                        <animated.Circle
                                            ref={node.ref}
                                            radius={style.r
                                                .to([0, 0.7, 1], [0, 40, 35])
                                                .to(r => r)
                                            }
                                            fill={style.fill}
                                            shadowBlur={node.elevation}
                                            shadowColor='black'
                                            shadowOffset={{ x: 0, y: 3 }}
                                            shadowOpacity={0.3}
                                        />
                                        <Text
                                            text={`${node.value}`}
                                            fontSize={20}
                                            fontFamily="'Roboto Mono'"
                                            fontStyle='bold'
                                            x={node.value < 10 ? -6 : -12}
                                            y={-7}
                                            fill={node.fill === 'white' ? 'black' : 'white'}
                                        />
                                    </animated.Group>
                                )
                            }
                        })}
                    </Layer>
                </Provider>
            </Stage>

        </div>
    )
}