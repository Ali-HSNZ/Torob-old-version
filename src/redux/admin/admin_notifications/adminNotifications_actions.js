import http, { requestError, token } from "src/services/http";
import { 
    ADMIN_FETCH_NOTIFICATIONS_FAILURE, 
    ADMIN_FETCH_NOTIFICATIONS_SUCCCESS, 
    ADMIN_FETCH_NOTIFICATIONS_REQUEST,

    ADMIN_DELETE_NOTIFICATION_REQUEST,
    ADMIN_DELETE_NOTIFICATION_SUCCCESS,
    ADMIN_DELETE_NOTIFICATION_FAILURE,
} from "./adminNotifications_types";


export const admin_fetchNofifcationsRequest = () => {return {type : ADMIN_FETCH_NOTIFICATIONS_REQUEST}}
export const admin_fetchNofifcationsSuccess = (payload) => {return {type : ADMIN_FETCH_NOTIFICATIONS_SUCCCESS , payload}}
export const admin_fetchNofifcationsFailure = (payload) => {return {type : ADMIN_FETCH_NOTIFICATIONS_FAILURE , payload}}

const admin_deleteNofifcationRequest = () => {return {type : ADMIN_DELETE_NOTIFICATION_REQUEST}}
const admin_deleteNofifcationSuccess = (payload) => {return {type : ADMIN_DELETE_NOTIFICATION_SUCCCESS , payload}}
const admin_deleteNofifcationFailure = (payload) => {return {type : ADMIN_DELETE_NOTIFICATION_FAILURE , payload}}


//! Use This in SSR
export const fetchAdminNotifications = ({store, page , order}) => dispatch => {
    dispatch(admin_fetchNofifcationsRequest())
    http.get(`admin/notifications?page=${page || 1}&limit=12&order=${order || "desc"}&store=${store || ""}` , {headers : {authorization : token}})
    .then(({data}) => dispatch(admin_fetchNofifcationsSuccess(data)))
    .catch(error => {
        requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن تعداد داده ها"})
        dispatch(admin_fetchNofifcationsFailure("خطای سرور در بخش گرفتن تعداد داده ها"))
    })
}

//! items => List Of notificate id
export const deleteAdminNotificationsViaId = (items) => dispatch => {
    dispatch(admin_deleteNofifcationRequest())
    http.put(`admin/notifications` , {items} , {headers : {authorization : token}})
    .then(({data}) => {
        dispatch(admin_deleteNofifcationSuccess(data))

    })
    .catch(error => {
        console.error(error)
        requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن تعداد داده ها"})
        dispatch(admin_deleteNofifcationFailure("خطای سرور در بخش گرفتن تعداد داده ها"))

    })
}