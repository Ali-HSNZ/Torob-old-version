import  { 
    ADMIN_FETCH_COUNT_REQUEST, 
    ADMIN_FETCH_COUNT_SUCCESS, 
    ADMIN_FETCH_COUNT_FAILURE 
} from "./admin_dataCountTypes";

const initailState = {data : null , loading : false , error : null}

export const admin_dataCountReducer = (state = initailState , action) => {
    switch (action.type) {
        case ADMIN_FETCH_COUNT_REQUEST: {return {data : null , loading : true , error : null}}
        case ADMIN_FETCH_COUNT_SUCCESS: {return {data : action.payload , loading : false , error : null}}
        case ADMIN_FETCH_COUNT_FAILURE: {return {data : null , loading : false , error : action.payload}}
        default:return state;
    }
}