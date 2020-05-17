import React from 'react';
import { Button } from '@rmwc/button';

import '@rmwc/button/styles';

export type NodeStatusTitleProps = {
    currentNodeIndex: number,
    backgroundColor: string,
    editNeighborMode: boolean,
    addNeighborMode: boolean,
    currentNeighborIndex: number,
    addNeighborModeButtonOnClick: () => void,
    deleteNeighborModeButtonOnClick: (index: number) => void
}

const NodeStatusTitle = (props: NodeStatusTitleProps) => {
    const { currentNodeIndex,
        backgroundColor,
        editNeighborMode,
        addNeighborMode,
        currentNeighborIndex,
        addNeighborModeButtonOnClick,
        deleteNeighborModeButtonOnClick } = props;

    return (
        <React.Fragment>
            <div className="node-status-card-title" style={{ backgroundColor: backgroundColor }}>
                <h2 style={{ wordSpacing: '-5px' }}>{`node ${currentNodeIndex}`}</h2>
            </div>

            <div className='neighbor-title'>
                <h4 style={{ marginTop: '0.4rem' }}>neighbor</h4>
                {!editNeighborMode ?
                    <Button label={addNeighborMode ? 'finish' : 'add'} onClick={() => {
                        addNeighborModeButtonOnClick();
                    }} />
                    :
                    <Button label='delete neighbor' onClick={() => deleteNeighborModeButtonOnClick(currentNeighborIndex)} />
                }
            </div>
        </React.Fragment>
    );
}

export default NodeStatusTitle;