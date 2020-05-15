import React from 'react';
import { Circle, Group, Text } from "react-konva";
import Konva from 'konva';
import { KonvaEventObject } from 'konva/types/Node';

export type NodeProps = {
    index: number,
    value: number,
    elevation: number,
    xPosition: number,
    yPosition: number,
    fill: string,
    onClick: () => void,
    onMouseEnter: () => void,
    onMouseLeave: () => void,
    onDragMove: (e: KonvaEventObject<DragEvent>) => void
}

export const Node = React.forwardRef(
    (props: NodeProps, ref?: React.Ref<Konva.Circle>) => {
        const {
            index, value, elevation, xPosition,
            yPosition, fill, onClick,
            onMouseEnter, onMouseLeave, onDragMove 
            } = props;

            return (
                <Group
                    key={index}
                    x={xPosition}
                    y={yPosition}
                    draggable
                    onClick={onClick}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onDragMove={onDragMove} 
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
    },
);

export default Node;