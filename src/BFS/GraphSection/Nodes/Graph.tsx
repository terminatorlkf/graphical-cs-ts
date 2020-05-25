import React, { useEffect } from 'react';
import Node from './Node';
import { nodeListStateInterface } from '../../../redux/BFS/store/graph/Interfaces/nodeListStateInterface';
import { Stage, Layer } from "react-konva";
import { KonvaEventObject } from 'konva/types/Node';
import EdgeList from '../Edges/EdgeList';
import { EdgeListInterface } from '../../../redux/BFS/store/graph/Interfaces/EdgeListInterface';
import { useSelector, useDispatch } from 'react-redux';
import * as graphActionType from '../../../redux/BFS/store/graph/graphActionType';
import { graphStateInterface } from '../../../redux/BFS/store/graph/graphReducer';

interface GraphInterface {
    nodeList: nodeListStateInterface[],
    edgeList: EdgeListInterface[],
    onClick: (index: number) => void,
    onMouseEnter: (index: number) => void,
    onMouseLeave: (index: number) => void,
    onDragMove: (index: number, e: KonvaEventObject<DragEvent>) => void
}

const Graph: React.FunctionComponent<GraphInterface> = ({
    onClick,
    onMouseEnter,
    onMouseLeave,
    onDragMove
}) => {

    const dispatch = useDispatch();
    const nodeList = useSelector((state: graphStateInterface) => state.nodeList);
    console.log('the nodeList is: ' + nodeList);

    return (
        <div className="operation-node-section">
            <Stage width={window.innerWidth - 580} height={window.innerHeight}>
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
                                    onClick={() => dispatch({ type: graphActionType.CLICK_NODE })}
                                    onMouseEnter={() => onMouseEnter(index)}
                                    onMouseLeave={() => onMouseLeave(index)}
                                    onDragMove={(e) => onDragMove(index, e)}
                                />
                            );
                        }
                        return null;
                    })}
                </Layer>
            </Stage>

        </div>
    )
}

export default Graph;