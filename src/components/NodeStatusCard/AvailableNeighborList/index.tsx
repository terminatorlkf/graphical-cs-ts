import React from 'react';
import { AvailableNeighborNode } from '../AvailableNeighborNode';
import SmoothCollapse from 'react-smooth-collapse';
import { useTransition, animated } from 'react-spring';
import { useDispatch } from 'react-redux';
import * as graphActionType from '../../../redux/BFS/graph/graphActionType';
import { IAvailableNeighborList } from './AvailableNeighborList';

export const AvailableNeighborList: React.FunctionComponent<IAvailableNeighborList.IProps> = (props: IAvailableNeighborList.IProps) => {
    const { expanded, nodeList, edgeList, currentNodeIndex, onMouseEnter, onMouseLeave } = props;
    const dispatch = useDispatch();

    const transition = useTransition(nodeList, node => node.index, {
        from: { opacity: 0, transform: 'translate3d(0, -1rem, 0)' },
        update: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        leave: { opacity: 0, transform: 'translate3d(0, -1rem, 0)' }
    });

    return (
        <React.Fragment>
            <SmoothCollapse allowOverflowWhenOpen expanded={expanded} className="neighbor-list-collapse-section">
                <div className="neighbor-list">
                    {transition.map(({ item, props, key }) => {
                        if (item.index !== -1 && currentNodeIndex !== -1) {
                            let isNeighbor = true;
                            if (item.value === currentNodeIndex)
                                isNeighbor = false;

                            edgeList.map(nodePair => {
                                if ((nodePair.edge[0] === nodeList[currentNodeIndex].index && nodePair.edge[1] === item.index) ||
                                    (nodePair.edge[1] === nodeList[currentNodeIndex].index && nodePair.edge[0] === item.index)) {
                                    isNeighbor = false;
                                }
                                return null;
                            })

                            let index = -1;

                            nodeList.map((node, i) => {
                                if (node.value === item.value) index = i;
                                return null;
                            });

                            if (isNeighbor && index !== -1) {
                                return (
                                    <animated.div key={key} style={props}>
                                        <AvailableNeighborNode
                                            key={key}
                                            index={index}
                                            value={item.value}
                                            onMouseEnter={onMouseEnter}
                                            onMouseLeave={onMouseLeave}
                                            onClick={index => dispatch({ type: graphActionType.CLICK_AVAILABLE_NEIGHBOR, payload: { index: index } })}
                                        />
                                    </animated.div>
                                )
                            }
                        }
                        return null;
                    })}
                </div>
            </SmoothCollapse>
        </React.Fragment>
    );
}