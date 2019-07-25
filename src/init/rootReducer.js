import { combineReducers } from 'redux';

import { tictactoeReducer } from '../bus/tictactoe/reducer';

export const rootReducer = combineReducers({
    tictactoe: tictactoeReducer,
})