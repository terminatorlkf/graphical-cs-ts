import React from 'react';
import { Elevation } from "@rmwc/elevation";
import { IAvailableNeighborNode } from './AvailableNeighborNode';
import '@rmwc/elevation/styles';

export const AvailableNeighborNode: React.FunctionComponent<IAvailableNeighborNode.IProps> = (
    {
        index,
        value,
        onMouseEnter,
        onMouseLeave,
        onClick
    }) => {
    return (
        <React.Fragment>
            <Elevation
                key={index}
                z={2}
                className="neighbor-node"
                onMouseEnter={() => onMouseEnter(index)}
                onMouseLeave={() => onMouseLeave(index)}
                onClick={() => onClick(index)}
            >
                <p>{value}</p>
            </Elevation>
        </React.Fragment>
    );
}
