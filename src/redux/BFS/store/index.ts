import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';

import { reducer } from './rootReducer';

const logger = createLogger({
    collapsed: true
})

const bfsStore = createStore(reducer, undefined, composeWithDevTools(applyMiddleware(logger)));

export default bfsStore;