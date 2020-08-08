import React from 'react';
import { Button } from '@rmwc/button';
import { INodeStatusTitle } from './NodeStatusTitle';
import { useSelector } from 'react-redux';
import '@rmwc/button/styles';
import { BfsRootReducer } from 'Interfaces/BfsRootReducer';

export const NodeStatusTitle = React.forwardRef<HTMLButtonElement, INodeStatusTitle.IProps>((props: INodeStatusTitle.IProps, ref?: React.Ref<HTMLButtonElement>) => {
    const { currentNodeIndex,
        backgroundColor,
        editNeighborMode,
        addNeighborMode,
        onAddNeighbor,
        onDeleteNeighbor } = props;

    const nodeList = useSelector((state: BfsRootReducer) => state.graph.nodeList);
    return (
        <React.Fragment>
            {currentNodeIndex !== -1 &&
                <>
                    <div className="node-status-card-title" style={{ backgroundColor: backgroundColor }}>
                        <h2 style={{ wordSpacing: '-5px' }}>{`node ${nodeList[currentNodeIndex].index}`}</h2>
                    </div>

                    <div className='neighbor-title'>
                        <h4 style={{ marginTop: '0.4rem' }}>neighbor</h4>
                        {!editNeighborMode ?
                            <Button ref={ref} label={addNeighborMode ? 'finish' : 'add'} onClick={onAddNeighbor} />
                            :
                            <Button ref={ref} label='delete neighbor' onClick={onDeleteNeighbor} />
                        }
                    </div>
                </>
            }

        </React.Fragment>
    );
})