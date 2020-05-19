import React from 'react';
import { Elevation } from "@rmwc/elevation";

import '@rmwc/elevation/styles';

export type AvailableNeighborNodeProps = {
    index: number,
    value: number,
    onMouseEnter: (index: number) => void,
    onMouseLeave: (index: number) => void,
    onClick: (index: number) => void
}

const AvailableNeighborNode = (props: AvailableNeighborNodeProps) => {
    const { index, value, onMouseEnter, onMouseLeave, onClick } = props;

    return (
        <React.Fragment>
            <Elevation
                key={index}
                z={2}
                className="neighbor-node"
                style={{paddingTop:'1%'}}
                onMouseEnter={() => onMouseEnter(index)}
                onMouseLeave={() => onMouseLeave(index)}
                onClick={() => onClick(index)}
            >
                <p>{value}</p>
            </Elevation>
        </React.Fragment>
    );
}

export default AvailableNeighborNode;