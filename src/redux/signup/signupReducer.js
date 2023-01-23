import { 
    SIGNUP_REQUEST, 
    SIGNUP_FAILURE, 
    SIGNUP_SUCCESS, 
} from "./signupTypes"

const initialValues = {user : null , loading : false , error : null}

export const signupReducer = (state = initialValues , action) => {
    switch (action.type) {
        case SIGNUP_REQUEST : {return {user : null , loading : true , error : null}}
        case SIGNUP_SUCCESS:{return {user : null , loading : false , error : null}}
        case SIGNUP_FAILURE:{return {user : null , loading : false , error : action.payload}}
        default : return state
    }
}