import  { 
    FETCH_ADMIN_COUNT_REQUEST, 
    FETCH_ADMIN_COUNT_SUCCESS, 
    FETCH_ADMIN_COUNT_FAILURE 
} from "./admin_dataCountTypes";

const initailState = {data : null , loading : false , error : null}

export const admin_dataCountReducer = (state = initailState , action) => {
    switch (action.type) {
        case FETCH_ADMIN_COUNT_REQUEST: {return {data : null , loading : true , error : null}}
        case FETCH_ADMIN_COUNT_SUCCESS: {return {data : action.payload , loading : false , error : null}}
        case FETCH_ADMIN_COUNT_FAILURE: {return {data : null , loading : false , error : action.payload}}
        default:return state;
    }
}