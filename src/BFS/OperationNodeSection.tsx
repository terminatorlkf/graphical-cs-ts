import React from 'react';
import Node from './Node';
import { nodeListStateInterface } from './nodeListStateInterface';
import { Stage, Layer } from "react-konva";

interface OperationNodeInterface {
    nodeList: nodeListStateInterface[],
    nodeClickHandler: (index: number) => void,
    mouseOverNodeHandler: (index: number) => void,
    mouseOutHandler: (index: number) => void
}

const OperationNodeSection: React.FunctionComponent<OperationNodeInterface> = ({
    nodeList,
    nodeClickHandler,
    mouseOverNodeHandler,
    mouseOutHandler
}) => {

    return (
        <div className="operation-node-section">
            <Stage width={window.innerWidth - 580} height={window.innerHeight}>
                <Layer>
                    {nodeList.map((node, index) => {
                        return (
                            <Node
                                index={index}
                                key={index}
                                value={node.value}
                                elevation={node.elevation}
                                xPosition={node.xPosition}
                                yPosition={node.yPosition}
                                fill={node.fill}
                                ref={null}
                                nodeClickHandler={() => nodeClickHandler(index)}
                                mouseOverNodeHandler={() => mouseOverNodeHandler(index)}
                                mouseOutHandler={() => mouseOutHandler(index)}
                            />
                        );
                    })}
                </Layer>
            </Stage>

        </div>
    )
}

export default OperationNodeSection;