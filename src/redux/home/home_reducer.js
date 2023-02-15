const { FETCH_HOME_DATA_REQUEST, FETCH_HOME_DATA_SUCCESS, FETCH_HOME_DATA_FAILURE } = require("./home_types")

const initialState = {
    data : null,
    error : null,
    loading : false,
}

export const home_stateReducer = (state = initialState , action) => {
    switch(action.type){
        case FETCH_HOME_DATA_REQUEST : {
            return {data : null , error : null , loading : true}
        }
        case FETCH_HOME_DATA_SUCCESS : {
            return {data : action.payload , error : null , loading : false}
        }
        case FETCH_HOME_DATA_FAILURE : {
            return {data : null , error : action.payload , loading : false}
        }
        default : return state
    }
}