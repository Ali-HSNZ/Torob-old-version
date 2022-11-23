const initialState = {user : null , error : null , loading : false , panel : false}
const { 
    AUTH_REQUEST, 
    AUTH_SUCCESS, 
    AUTH_FAILURE,
    AUTH_PANEL
} = require("./userTypes");

export const authReduser = (state = initialState , action) => {
    switch (action.type) {
        case AUTH_REQUEST:{return {user : state.user , error : null , loading : true,panel : state.panel}}
        case AUTH_SUCCESS:{return {user : action.payload , error : null , loading : false, panel : true}}
        case AUTH_FAILURE:{return {user : null , error : action.payload , loading : false}}
        
        case AUTH_PANEL : {return {...state ,panel : action.payload}}
        default: return state
    }
}
