import React from 'react';
import { Circle, Group, Text } from "react-konva";
import { nodeListStateInterface } from './nodeListStateInterface';
import Konva from 'konva';

interface nodeInterface {
    index: number,
    value: number,
    elevation: number,
    xPosition: number,
    yPosition: number,
    fill: string,
    ref: React.MutableRefObject<Konva.Circle> | null,
    nodeClickHandler: () => void,
    mouseOverNodeHandler: () => void,
    mouseOutHandler: () => void,
}

const Node: React.FunctionComponent<nodeInterface> = ({
    index, value, elevation, xPosition,
    yPosition, fill, ref, nodeClickHandler,
    mouseOverNodeHandler, mouseOutHandler }) => {
    return (
        <Group
            key={index}
            x={xPosition}
            y={yPosition}
            draggable
            onClick={nodeClickHandler}
            onMouseOver={mouseOverNodeHandler}
            onMouseOut={mouseOutHandler}
            onDragMove={(e) => {
                xPosition = e.target.x();
                yPosition = e.target.y();
            }}
        >
            <Circle
                ref={ref}
                radius={35}
                fill={fill}
                shadowBlur={elevation}
                shadowColor='black'
                shadowOffset={{ x: 0, y: 3 }}
                shadowOpacity={0.3}
            />
            <Text
                text={`${value}`}
                fontSize={20}
                fontFamily="'Roboto Mono'"
                fontStyle='bold'
                x={value < 10 ? -6 : -12}
                y={-7}
                fill={fill === 'white' ? 'black' : 'white'}
            />
        </Group>
    )
}

export default Node;