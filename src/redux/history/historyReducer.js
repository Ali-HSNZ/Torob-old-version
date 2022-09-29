import { 
    HISTORY_REQUEST, 
    HISTORY_SUCCESS,
    HISTORY_FAILURE, 
    HISTORY_REMOVED
} from "./historyTypes"

const initailState = {history : null , loading :  false , error : null} 

export const historyReducer = (state = initailState , action) => {
switch (action.type) {
        case HISTORY_REQUEST: {return {history : null , loading :  true , error : null} }
        case HISTORY_SUCCESS: {return {history : action.payload.length > 0 ? action.payload : null , loading :  false , error : null} }
        case HISTORY_FAILURE: {return {history : null , loading :  false , error : action.payload}}
        case HISTORY_REMOVED : {return {history : null , loading :  false , error : null} } 
        default: return state
    }
}




