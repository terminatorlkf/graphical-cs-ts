import { combineReducers } from 'redux';
import graphReducer from '../graph/graphReducer';
import { GraphState } from '../../../Interfaces/GraphState';

export interface bfsRootReducerInterface {
    graph: GraphState
}

export const reducer = combineReducers({
    graph: graphReducer
})
