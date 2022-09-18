const { 
    SIGNUP_USER_REQUEST, 
    SIGNUP_USER_SUCCESS, 
    SIGNUP_USER_FAILURE 
} = require("./userTypes");

const initialState = {user : null , error : null , loading : false}

export const userSignupReduser = (state = initialState , action) => {
    switch (action.type) {
        case SIGNUP_USER_REQUEST:{
            return {...state , user : null , error : null , loading : true}
        }
        case SIGNUP_USER_SUCCESS:{
            return {...state , user : action.payload , error : null , loading : false}
        }
        case SIGNUP_USER_FAILURE:{
            return {...state , user : null , error : action.payload , loading : false}
        }
        default: return state
    }
}
