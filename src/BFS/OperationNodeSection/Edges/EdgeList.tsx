import React from 'react';
import { nodeListStateInterface } from '../../Interfaces/nodeListStateInterface';
import { EdgeListInterface } from '../../Interfaces/EdgeListInterface';
import Edge from './Edge';


export type EdgeListProps = {
    edgeList: EdgeListInterface[]
    nodeListState: nodeListStateInterface[]
}

const EdgeList = (props : EdgeListProps) => {
    const {edgeList, nodeListState} = props;
    
    return (
        <React.Fragment>
            {edgeList.length !== 0 &&
                edgeList.map((edge) => {
                    return (
                        <Edge
                            edge={edge.edge}
                            nodeListState={nodeListState}
                        />
                    );
                })
            }
        </React.Fragment>
    );
}

export default EdgeList;