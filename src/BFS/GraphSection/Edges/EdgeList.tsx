import React from 'react';
import Edge from './Edge';
import { useSelector } from 'react-redux';
import { bfsRootReducerInterface } from '../../../redux/BFS/store/rootReducer';

const EdgeList = () => {
    const edgeList = useSelector((state: bfsRootReducerInterface) => state.graph.edgeList);
    const nodeList = useSelector((state: bfsRootReducerInterface) => state.graph.nodeList);

    return (
        <React.Fragment>
            {edgeList.length !== 0 &&
                edgeList.map((edge) => {
                    return (
                        <Edge
                            edge={edge.edge}
                            nodeListState={nodeList}
                        />
                    );
                })
            }
        </React.Fragment>
    );
}

export default EdgeList;