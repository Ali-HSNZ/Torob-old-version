import { 
    FETCH_ANALYTICS_FAILURE,
    FETCH_ANALYTICS_REQUEST, 
    FETCH_ANALYTICS_SUCCESS,
    INSERT_ANALYZE_LOADING
} from "./analyticsTypes";

const initailState = {analytics : null , error : null , loading : false , analyticsLoading : []}
export const analyticsReducer = (state = initailState , action) => {   
    switch (action.type) {
        case FETCH_ANALYTICS_REQUEST : {return {analytics : null,error : null,loading : true,analyticsLoading : state.analyticsLoading}}
        case FETCH_ANALYTICS_SUCCESS : {return {analytics : action.payload.length > 0 ? action.payload : null,error : null ,loading : false,analyticsLoading : []}}
        case FETCH_ANALYTICS_FAILURE : {return {analytics : null , error : action.payload , loading : false , analyticsLoading : state.analyticsLoading}}
        case INSERT_ANALYZE_LOADING : {return {...state , analyticsLoading : [...state.analyticsLoading ,{hash_id : action.hash_id}]}}
        default: return state
    }
}