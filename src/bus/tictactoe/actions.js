import { ADD_ITEM, CLEAR } from './types';


export const addItem =(text)=> {
    return {
        type: ADD_ITEM,
        payload: text
    }
}
export const clear = () => {
    return {
        type: CLEAR,
    }
}