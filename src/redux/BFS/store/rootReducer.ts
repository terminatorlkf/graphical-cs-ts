import { combineReducers } from 'redux';
import graphReducer, { graphStateInterface } from './graph/graphReducer';

export interface bfsRootReducerInterface {
    graph: graphStateInterface
}

export const reducer = combineReducers({
    graph: graphReducer
})
