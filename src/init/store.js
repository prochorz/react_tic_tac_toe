import { createStore, applyMiddleware, compose } from 'redux';

import { rootReducer } from './rootReducer';

const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devtools ? devtools : compose;
const enhancedStore = composeEnhancers( applyMiddleware() );

export const store = createStore(rootReducer, enhancedStore );