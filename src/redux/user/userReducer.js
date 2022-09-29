const initialState = {user : null , error : null , loading : false , panel : false}
const { 
    SIGNUP_USER_REQUEST, 
    SIGNUP_USER_SUCCESS, 
    SIGNUP_USER_FAILURE,
    AUTH_PANEL
} = require("./userTypes");

export const userSignupReduser = (state = initialState , action) => {
    switch (action.type) {
        case SIGNUP_USER_REQUEST:{return {user : null , error : null , loading : true}}
        case SIGNUP_USER_SUCCESS:{return {user : action.payload , error : null , loading : false, panel : true}}
        case SIGNUP_USER_FAILURE:{return {user : null , error : action.payload , loading : false}}
        case AUTH_PANEL : {return {...state ,panel : action.payload}}
        default: return state
    }
}
