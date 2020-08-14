import React from 'react';
import { Text } from "react-konva";
import { useTransition, animated } from '@react-spring/konva';
import Konva from 'konva';
import { INodes } from './Nodes';

export const Nodes = React.forwardRef<Konva.Circle, INodes.IProps>(
    (props: INodes.IProps, ref?: React.Ref<Konva.Circle>) => {
        const {
            nodeList, onClick,
            onMouseEnter, onMouseLeave, onDragMove
        } = props;

        const transition = useTransition(nodeList, {
            key: node => node.index,
            from: { o: 0, r: 0 },
            enter: { o: 1, r: 1 },
            leave: { o: 0, r: 0 }
        })

        return (
            <>
                {transition((style, node, t, index) =>
                    <animated.Group
                        key={index}
                        x={node.xPosition}
                        y={node.yPosition}
                        draggable
                        onClick={onClick}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        onDragMove={onDragMove}
                        opacity={style.o.to(o => o)}
                    >
                        <animated.Circle
                            ref={ref}
                            radius={style.r
                                .to([0, 0.7, 1], [0, 40, 35])
                                .to(r => r)
                            }
                            fill={node.fill}
                            shadowBlur={node.elevation}
                            shadowColor='black'
                            shadowOffset={{ x: 0, y: 3 }}
                            shadowOpacity={0.3}
                        />
                        <Text
                            text={`${node.value}`}
                            fontSize={20}
                            fontFamily="'Roboto Mono'"
                            fontStyle='bold'
                            x={node.value < 10 ? -6 : -12}
                            y={-7}
                            fill={node.fill === 'white' ? 'black' : 'white'}
                        />
                    </animated.Group>

                )}
            </>
        )
    },
);
