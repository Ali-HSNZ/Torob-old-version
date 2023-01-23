import { 
    ADMIN_FETCH_ONE_USER_FAILURE,
    ADMIN_FETCH_ONE_USER_REQUEST,
    ADMIN_FETCH_ONE_USER_SUCCESS,
    
    ADMIN_FETCH_USERS_FAILURE,
    ADMIN_FETCH_USERS_REQUEST,
    ADMIN_FETCH_USERS_SUCCESS,

    ADMIN_INSERT_USER_FAILURE, 
    ADMIN_INSERT_USER_REQUEST, 
    ADMIN_INSERT_USER_SUCCESS 
} from "./admin_manageUsersTypes"


const initialValues = {
     users : null , 
     loading : false ,
     error : null , 
     oneUser : {user : null , loading : false , error : null}
}

export const admin_manageUsersReducer = (state = initialValues , action) => {
    switch (action.type) {

        case ADMIN_INSERT_USER_REQUEST:{
            return {data : null , loading : true , error : null}
        }
        case ADMIN_INSERT_USER_SUCCESS:{
            return {data : null , loading : false , error : null}
        }
        case ADMIN_INSERT_USER_FAILURE:{
            return {data : state.data , loading : false , error : action.payload}
        }


        case ADMIN_FETCH_ONE_USER_REQUEST:{
            return {...state ,loading : true, oneUser : { user : state.oneUser.user , error : null}}
        }
        case ADMIN_FETCH_ONE_USER_SUCCESS:{
            
            return {...state ,loading : false, oneUser : { user : action.payload , error : null}}
        }
        case ADMIN_FETCH_ONE_USER_FAILURE:{
            return  {...state ,loading : false, oneUser : { user : state.oneUser.user , error : action.payload}}
        }


        case ADMIN_FETCH_USERS_REQUEST:{
            return {...state,users : null , loading : true , error : null}
        }
        case ADMIN_FETCH_USERS_SUCCESS:{
            return {
                ...state,
                users : action.payload && action.payload.users.length > 0 ? action.payload.users : null,
                pagination : action.payload.pagination,
                error : null , 
                loading : false,
            }
        }
        case ADMIN_FETCH_USERS_FAILURE:{
            return {...state,users : state.users , loading : false , error : action.payload}
        }
        
        default : return state
    }
}