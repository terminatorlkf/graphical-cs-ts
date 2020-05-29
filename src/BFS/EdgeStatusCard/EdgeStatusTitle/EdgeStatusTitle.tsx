import React from 'react';
import { Button } from '@rmwc/button';

import '@rmwc/button/styles';

export type EdgeStatusTitleProps = {
    currentEdgeIndex: number,
    backgroundColor: string,
}

const NodeStatusTitle = React.forwardRef((props: EdgeStatusTitleProps, ref?: React.Ref<HTMLButtonElement>) => {
    const { currentEdgeIndex,
        backgroundColor,
        } = props;

    return (
        <React.Fragment>
            <div className="node-status-card-title" style={{ backgroundColor: backgroundColor }}>
                <h2 style={{ wordSpacing: '-5px' }}>{`edge ${currentEdgeIndex}`}</h2>
            </div>

            <div className='neighbor-title'>
                <h4 style={{ marginTop: '0.4rem' }}>neighbor</h4>
            </div>
        </React.Fragment>
    );
})

export default NodeStatusTitle;