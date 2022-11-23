const initialState = {user : null , error : null , loading : false , panel : false , panelType:'normal'}
const { 
    AUTH_REQUEST, 
    AUTH_SUCCESS, 
    AUTH_FAILURE,
    AUTH_PANEL,
    CHANGE_PANEL_TYPE
} = require("./userTypes");

export const authReduser = (state = initialState , action) => {
    switch (action.type) {
        case AUTH_REQUEST:{return {...state , user : state.user , error : null , loading : true,panel : state.panel}}
        case AUTH_SUCCESS:{return {...state , user : action.payload , error : null , loading : false, panel : true}}
        case AUTH_FAILURE:{return {...state , user : null , error : action.payload , loading : false}}
        
        case AUTH_PANEL : {
            const {isOpen,type} = action.payload
            return {...state , panelType : type,panel : isOpen}
        }
        case CHANGE_PANEL_TYPE : {return {...state ,panelType : action.payload}}
        default: return state
    }
}
