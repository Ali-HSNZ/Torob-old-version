import { 
    USER_SEARCH_SUGGESTED_REQUEST, 
    USER_SEARCH_SUGGESTED_SUCCESS, 
    USER_SEARCH_SUGGESTED_FAILURE,

    FETCH_SEARCH_DATA_REQUEST,
    FETCH_SEARCH_DATA_SUCCESS,
    FETCH_SEARCH_DATA_FAILURE,
} from "./userSaerch_types"

const initialState = {
    suggested : {data : null , error : null , loading : false},
    searchData : {data : null , error : null , loading : false}
}

export const userSearchReducer = (state = initialState , action) => {
    switch(action.type){
        case USER_SEARCH_SUGGESTED_REQUEST : {return {...state , suggested : {data : state.suggested.data , error : null , loading : true}}};
        case USER_SEARCH_SUGGESTED_SUCCESS : {return {...state , suggested : {data : action.payload , error : null , loading : false}}};
        case USER_SEARCH_SUGGESTED_FAILURE : {return {...state , suggested : {data : null , error :  action.payload , loading : false}}};
        
        case FETCH_SEARCH_DATA_REQUEST : {return {...state , searchData : {data : null , error : null , loading : true}}};
        case FETCH_SEARCH_DATA_SUCCESS : {return {...state , searchData : {data : action.payload , error : null , loading : false}}};
        case FETCH_SEARCH_DATA_FAILURE : {return {...state , searchData : {data : null , error :  action.payload , loading : false}}};

        default : return state
    }
}