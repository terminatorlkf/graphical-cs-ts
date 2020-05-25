import React, { useEffect } from 'react';
import Node from './Nodes/Node';
import { nodeListStateInterface } from '../../redux/BFS/store/graph/Interfaces/nodeListStateInterface';
import { Stage, Layer } from "react-konva";
import { KonvaEventObject } from 'konva/types/Node';
import EdgeList from './Edges/EdgeList';
import { EdgeListInterface } from '../../redux/BFS/store/graph/Interfaces/EdgeListInterface';
import { useSelector, useDispatch, useStore, Provider } from 'react-redux';
import * as graphActionType from '../../redux/BFS/store/graph/graphActionType';
import { bfsRootReducerInterface } from '../../redux/BFS/store/rootReducer';

interface GraphInterface {
    onMouseEnter: (index: number) => void,
    onMouseLeave: (index: number) => void,
    onDragMove: (index: number, e: KonvaEventObject<DragEvent>) => void
}

const Graph: React.FunctionComponent<GraphInterface> = ({
    onMouseEnter,
    onMouseLeave,
    onDragMove
}) => {

    const dispatch = useDispatch();
    const nodeList = useSelector((state: bfsRootReducerInterface) => state.graph.nodeList);
    const store = useStore();

    return (
        <div className="operation-node-section">
            <Stage width={window.innerWidth - 580} height={window.innerHeight}>
                <Provider store={store}>
                    <Layer>
                        <EdgeList />
                        {nodeList.map((node, index) => {
                            if (node.index !== -1) {
                                return (
                                    <Node
                                        index={index}
                                        key={index}
                                        value={node.value}
                                        elevation={node.elevation}
                                        xPosition={node.xPosition}
                                        yPosition={node.yPosition}
                                        fill={node.fill}
                                        ref={node.ref}
                                        onClick={() => dispatch({ type: graphActionType.CLICK_NODE, payload: { index: index } })}
                                        onMouseEnter={() => onMouseEnter(index)}
                                        onMouseLeave={() => onMouseLeave(index)}
                                        onDragMove={(e) => onDragMove(index, e)}
                                    />
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

export default Graph;