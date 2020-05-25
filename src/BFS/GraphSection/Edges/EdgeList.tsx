import React from 'react';
import Edge from './Edge';
import { useSelector } from 'react-redux';
import { graphStateInterface } from '../../../redux/BFS/store/graph/graphReducer';

const EdgeList = () => {
    const edgeList = useSelector((state: graphStateInterface) => state.edgeList);
    const nodeList = useSelector((state: graphStateInterface) => state.nodeList);

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