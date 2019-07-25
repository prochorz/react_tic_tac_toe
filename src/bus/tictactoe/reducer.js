import { ADD_ITEM, CLEAR } from './types';

const initialState = {
    history: [],
};

export const tictactoeReducer = (state = initialState, action) =>{
    switch (action.type ) {
        case ADD_ITEM:
            return {
                ...state,
                history: [ ...state.history, action.payload]
            };
        case CLEAR:
            return {
                ...state,
                history: []
            }
        default:
            return state;

    }
}
