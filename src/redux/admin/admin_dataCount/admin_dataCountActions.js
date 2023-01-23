import http, { requestError, token } from "src/services/http";
import  { 
    ADMIN_FETCH_COUNT_REQUEST, 
    ADMIN_FETCH_COUNT_SUCCESS, 
    ADMIN_FETCH_COUNT_FAILURE 
} from "./admin_dataCountTypes";

const fetchAdminCountRequest = () => {return {type : ADMIN_FETCH_COUNT_REQUEST}}
export const fetchAdminCountSuccess = (payload) => {return {type : ADMIN_FETCH_COUNT_SUCCESS , payload}}
export const fetchAdminCountFailure = (payload) => {return {type : ADMIN_FETCH_COUNT_FAILURE , payload}}

// Used in SSR
export const fetchAdminCount = () => dispatch => {
     dispatch(fetchAdminCountRequest())
     http.get(`admin/counter` , {headers : {authorization : token}})
     .then(({data}) => dispatch(fetchAdminCountSuccess(data.count)))
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن تعداد داده ها"})
          dispatch(fetchAdminCountFailure("خطای سرور در بخش گرفتن تعداد داده ها"))
     })
}