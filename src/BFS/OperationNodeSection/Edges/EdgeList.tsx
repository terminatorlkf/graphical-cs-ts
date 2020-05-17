import React, { FunctionComponent } from 'react';
import { nodeListStateInterface } from '../../nodeListStateInterface';
import Edge from './Edge';

interface EdgeListInterface {
    edgeList: number[][]
    nodeListState: nodeListStateInterface[]
}

const EdgeList: FunctionComponent<EdgeListInterface> = ({ edgeList, nodeListState }) => {
    return (
        <React.Fragment>
            {edgeList.length !== 0 &&
                edgeList.map((edge) => {
                    return (
                        <Edge
                            edge={edge}
                            nodeListState={nodeListState}
                        />
                    );
                })
            }
        </React.Fragment>
    );
}

export default EdgeList;