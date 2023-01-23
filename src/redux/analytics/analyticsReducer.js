import { 
    FETCH_ANALYTICS_FAILURE,
    FETCH_ANALYTICS_REQUEST, 
    FETCH_ANALYTICS_SUCCESS,
} from "./analyticsTypes";

const initailState = {analytics : null , error : null , loading : false , analyticsLoading : []}
export const analyticsReducer = (state = initailState , action) => {   
    switch (action.type) {
        case FETCH_ANALYTICS_REQUEST : {return {analytics : [],error : null,loading : true,}}
        case FETCH_ANALYTICS_SUCCESS : {return {analytics : action.payload , error : null ,loading : false}}
        case FETCH_ANALYTICS_FAILURE : {return {analytics : [] , error : action.payload , loading : false}}
        default: return state
    }
}