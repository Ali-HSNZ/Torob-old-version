import { 
    USER_SEARCH_SUGGESTED_REQUEST, 
    USER_SEARCH_SUGGESTED_SUCCESS, 
    USER_SEARCH_SUGGESTED_FAILURE 
} from "./userSaerch_types"

const initialState = {data : null , error : null , loading : false}

export const userSearchReducer = (state = initialState , action) => {
    switch(action.type){
        case USER_SEARCH_SUGGESTED_REQUEST : {
            return {data : null , error : null , loading : true}
        };
        case USER_SEARCH_SUGGESTED_SUCCESS : {
            return {data : action.payload , error : null , loading : false}
        };
        case USER_SEARCH_SUGGESTED_FAILURE : {
            return {data : null , error :  action.payload , loading : false}
        };
        default : return state
    }
}