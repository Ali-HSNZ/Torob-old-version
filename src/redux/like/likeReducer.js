import { 
    FETCH_LIKES_FAILURE,
    FETCH_LIKES_REQUEST, 
    FETCH_LIKES_SUCCESS,
    INSERT_LIKE_LOADING
} from "./likeTypes";

const initailState = {likes : null , error : null , loading : false , likesLoading : []}
export const likesReducer = (state = initailState , action) => {   
    switch (action.type) {
        case FETCH_LIKES_REQUEST : {return {likes : null,error : null,loading : true,likesLoading : state.likesLoading}}
        case FETCH_LIKES_SUCCESS : {return {likes : action.payload.length > 0 ? action.payload : null,error : null ,loading : false,likesLoading : []}}
        case FETCH_LIKES_FAILURE : {return {likes : null , error : action.payload , loading : false , likesLoading : state.likesLoading}}
        case INSERT_LIKE_LOADING : {return {...state , likesLoading : [...state.likesLoading ,{hash_id : action.hash_id}]}}
        default: return state
    }
}