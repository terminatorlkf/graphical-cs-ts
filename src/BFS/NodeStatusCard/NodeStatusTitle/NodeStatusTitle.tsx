import React from 'react';
import { Button } from '@rmwc/button';

import '@rmwc/button/styles';

export type NodeStatusTitleProps = {
    currentNodeIndex: number,
    backgroundColor: string,
    editNeighborMode: boolean,
    addNeighborMode: boolean,
    currentNeighborIndex: number,
    onAddNeighbor: () => void,
    onDeleteNeighbor: (index: number) => void
}

const NodeStatusTitle = React.forwardRef((props: NodeStatusTitleProps, ref?: React.Ref<HTMLButtonElement>) => {
    const { currentNodeIndex,
        backgroundColor,
        editNeighborMode,
        addNeighborMode,
        currentNeighborIndex,
        onAddNeighbor,
        onDeleteNeighbor } = props;

    return (
        <React.Fragment>
            <div className="node-status-card-title" style={{ backgroundColor: backgroundColor }}>
                <h2 style={{ wordSpacing: '-5px' }}>{`node ${currentNodeIndex}`}</h2>
            </div>

            <div className='neighbor-title'>
                <h4 style={{ marginTop: '0.4rem' }}>neighbor</h4>
                {!editNeighborMode ?
                    <Button ref={ref} label={addNeighborMode ? 'finish' : 'add'} onClick={onAddNeighbor} />
                    :
                    <Button ref={ref} label='delete neighbor' onClick={() => onDeleteNeighbor(currentNeighborIndex)} />
                }
            </div>
        </React.Fragment>
    );
})

export default NodeStatusTitle;