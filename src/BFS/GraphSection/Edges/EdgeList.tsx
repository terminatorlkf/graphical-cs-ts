import React from 'react';
import Edge from './Edge';
import { useSelector } from 'react-redux';
import { Line } from 'react-konva';
import { bfsRootReducerInterface } from '../../../redux/BFS/store/rootReducer';
import { useSprings, animated } from '@react-spring/konva';

const EdgeList = () => {
    const edgeList = useSelector((state: bfsRootReducerInterface) => state.graph.edgeList);
    const nodeList = useSelector((state: bfsRootReducerInterface) => state.graph.nodeList);

    const springs = useSprings(edgeList.length, edgeList.map(edge => ({ 
        points: [edge.edge[0]]
    })));

    return (
        <React.Fragment>
            {edgeList.length !== 0 &&
                edgeList.map((edge) => {
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
                        />
                    );
                })
            }
        </React.Fragment>
    );
}

export default EdgeList;