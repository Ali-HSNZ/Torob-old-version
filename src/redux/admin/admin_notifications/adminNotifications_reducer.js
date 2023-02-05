import { 
    ADMIN_FETCH_NOTIFICATIONS_FAILURE, 
    ADMIN_FETCH_NOTIFICATIONS_REQUEST, 
    ADMIN_FETCH_NOTIFICATIONS_SUCCCESS,

    ADMIN_DELETE_NOTIFICATION_REQUEST,
    ADMIN_DELETE_NOTIFICATION_SUCCCESS,
    ADMIN_DELETE_NOTIFICATION_FAILURE,
} from "./adminNotifications_types"

const initailState = {data : [] , deleteLoading : false , loading : false , error : null}

export const admin_notificationsReducer = (state = initailState , action) => {
    switch (action.type) {
        case ADMIN_FETCH_NOTIFICATIONS_REQUEST : {return { data : state.data ,  deleteLoading : false, loading : true , error : null}}
        case ADMIN_FETCH_NOTIFICATIONS_SUCCCESS : {return { data : action.payload , deleteLoading : false, loading : false , error : null}}
        case ADMIN_FETCH_NOTIFICATIONS_FAILURE : {return { data : [] , deleteLoading : false, loading : false , error : action.payload}}
        
        case ADMIN_DELETE_NOTIFICATION_REQUEST : {return { data : state.data , deleteLoading : true ,  loading : false , error : null}}
        case ADMIN_DELETE_NOTIFICATION_SUCCCESS : {return { data : action.payload , deleteLoading : false ,  loading : false , error : null}}
        case ADMIN_DELETE_NOTIFICATION_FAILURE : {return { data : [] , deleteLoading : false ,  loading : false , error : action.payload}}    
        
        default:return state;
    }
}