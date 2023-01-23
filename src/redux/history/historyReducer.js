import { 
    HISTORY_REQUEST, 
    HISTORY_SUCCESS,
    HISTORY_FAILURE, 
    HISTORY_REMOVED
} from "./historyTypes"

const initailState = {history : [] , loading :  false , error : null} 

export const historyReducer = (state = initailState , action) => {
switch (action.type) {
        case HISTORY_REQUEST: {return {history : [] , loading :  true , error : null} }
        case HISTORY_SUCCESS: {return {history : action.payload, loading :  false , error : null} }
        case HISTORY_FAILURE: {return {history : [] , loading :  false , error : action.payload}}
        default: return state
    }
}




