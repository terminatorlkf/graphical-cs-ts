import React from 'react'
import { Stage, Layer } from 'react-konva';
import { Edges } from 'Components/Graph/Edges';
import { Nodes } from 'Components/Graph/Nodes';
import { ISearchTree } from './SearchTree';

export const SearchTree: React.FC<ISearchTree.IProps> = ({ width, height, nodeList, edgeList }) => {

    return (
        <Stage width={width} height={height} draggable>
            <Layer>
                <Edges nodeList={nodeList} edgeList={edgeList} />
                <Nodes nodeList={nodeList} />
            </Layer>
        </Stage>
    )
}
