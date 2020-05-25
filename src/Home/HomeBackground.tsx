import React, { useState } from "react";
import { Circle, Layer, Stage, Line } from "react-konva";
import { useSprings, animated } from '@react-spring/konva';

import './HomeBackground.css';
import { interpolate } from "react-spring";

export default function HomeBackground() {

    const presetState = [...Array(32)].map((_, index) => {
        const block = Math.floor(index / 8);
        const blokcWidth = window.innerWidth * (1 / 2);
        const blokcHeight = window.innerHeight * (1 / 2);
        if (Number.isInteger(index / 8)) {
            return ({
                key: index,
                xPosition: block % 2 * blokcWidth + blokcWidth * 0.5,
                yPosition: Math.floor(block / 2) * blokcHeight + blokcHeight * 0.5
            });
        }
        return ({
            key: index,
            xPosition: block % 2 * blokcWidth + Math.random() * blokcWidth,
            yPosition: Math.floor(block / 2) * blokcHeight + Math.random() * blokcHeight
        });
    });

    const animations = useSprings(presetState.length, presetState.map(state => ({
        to: async next => {
            while (1) {
                await next({ x: state.xPosition, y: state.yPosition })
                await next({ x: state.xPosition + 0, y: state.yPosition + Math.random() * 100 })
                await next({ x: state.xPosition + Math.random() * 100, y: state.yPosition + 0 })
                await next({ x: state.xPosition + 0, y: state.yPosition + 0 })
            }
        },
        from: { x: state.xPosition, y: state.yPosition }
    })));

    const lineSet = () => {
        return animations.map((node, index) => {
            return [
                0,
                0,
                animations[Math.floor(index / 8) * 8].x.getValue() - animations[index].x.getValue(),
                animations[Math.floor(index / 8) * 8].y.getValue() - animations[index].y.getValue(),
            ];
        });
    }

    const [lineState, setLineState] = useState<number[][]>(lineSet())

    return (
        <div className="home-background">
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    {presetState.map((state, index) => {
                        const props = animations[index]
                        return (
                            <React.Fragment>
                                <animated.Group
                                    {...props}
                                >
                                    <Line
                                        points={lineState[index]}
                                        stroke='black' />
                                    <Circle radius={5} fill="black" />
                                </animated.Group>
                            </React.Fragment>
                        );
                    })}
                </Layer>
            </Stage>
        </div>
    );
}