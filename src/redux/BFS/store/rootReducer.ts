import { combineReducers } from 'redux';
import graphReducer from '../graph/graphReducer';

export const reducer = combineReducers({
    graph: graphReducer
})
