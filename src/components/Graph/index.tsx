import React from 'react';
import { Stage, Layer, Group, Circle, Text } from "react-konva";
import { Edges } from '../Edges';
import { useSelector, useDispatch, useStore, Provider } from 'react-redux';
import * as graphActionType from '../../redux/BFS/graph/graphActionType';
import { BfsRootReducer } from '../../Interfaces/BfsRootReducer';
import { useTransition, animated, interpolate } from '@react-spring/konva';
import { IGraph } from './Graph';

export const Graph: React.FunctionComponent<IGraph.IProps> = ({
    onMouseEnter,
    onMouseLeave,
    onDragMove
}) => {

    const dispatch = useDispatch();
    const nodeList = useSelector((state: BfsRootReducer) => state.graph.nodeList);
    const store = useStore();

    const transition = useTransition(nodeList, node => node.index, {
        from: { r: 0 },
        enter: { r: 1 },
        leave: { r: 0 }
    });

    let canvasWidth: number = 0;
    if (window.innerWidth < 1500) canvasWidth = window.innerWidth * 1/2;
    else if (window.innerWidth < 2500) canvasWidth = window.innerWidth * 2/3;
    else canvasWidth = window.innerWidth * 1/3;

    return (
        <div className="operation-node-section">
            <Stage width={canvasWidth} height={window.innerHeight}>
                <Provider store={store}>
                    <Layer>
                        <Edges />
                        {nodeList.map((node, index) => {
                            if (node.index !== -1) {
                                return (
                                    <Group
                                        key={index}
                                        x={node.xPosition}
                                        y={node.yPosition}
                                        draggable
                                        onClick={() => dispatch({ type: graphActionType.CLICK_NODE, payload: { index: index } })}
                                        onMouseEnter={() => onMouseEnter(index)}
                                        onMouseLeave={() => onMouseLeave(index)}
                                        onDragMove={(e) => onDragMove(index, e)}
                                    >
                                        <Circle
                                            ref={node.ref}
                                            radius={35}
                                            fill={node.fill}
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
                                    </Group>
                                );
                            }
                            return null;
                        })}
                    </Layer>
                </Provider>
            </Stage>

        </div>
    )
}