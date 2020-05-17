import React from 'react';
import Node from './Node';
import { nodeListStateInterface } from '../nodeListStateInterface';
import { Stage, Layer } from "react-konva";
import { KonvaEventObject } from 'konva/types/Node';
import EdgeList from './Edges/EdgeList';

interface OperationNodeInterface {
    nodeList: nodeListStateInterface[],
    edgeList: number[][],
    onClick: (index: number) => void,
    onMouseEnter: (index: number) => void,
    onMouseLeave: (index: number) => void,
    onDragMove: (index: number, e: KonvaEventObject<DragEvent>) => void
}

const OperationNodeSection: React.FunctionComponent<OperationNodeInterface> = ({
    nodeList,
    edgeList,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onDragMove
}) => {

    return (
        <div className="operation-node-section">
            <Stage width={window.innerWidth - 580} height={window.innerHeight}>
                <Layer>
                    <EdgeList
                        edgeList={edgeList}
                        nodeListState={nodeList}
                    />
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
                                    onClick={() => onClick(index)}
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

export default OperationNodeSection;