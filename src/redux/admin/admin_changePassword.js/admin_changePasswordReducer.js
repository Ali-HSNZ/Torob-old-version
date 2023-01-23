import { 
    ADMIN_CHANGE_PASSWORD_REQUEST, 
    ADMIN_CHANGE_PASSWORD_SUCCESS,
    ADMIN_CHANGE_PASSWORD_FAILURE, 
} from "./admin_changePasswordTypes"

const initialState = {loading : false , error : null}

export const admin_changePasswordReducer = (state = initialState , action) => {
    switch (action.type) {
        case ADMIN_CHANGE_PASSWORD_REQUEST : {return {loading : true , error : null}}
        case ADMIN_CHANGE_PASSWORD_SUCCESS : {return {loading : false , error : null}}    
        case ADMIN_CHANGE_PASSWORD_FAILURE : {return {loading : false , error : action.payload}}
        default : return state;
    }
}