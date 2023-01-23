import http, { requestError, token } from "src/services/http";
import { 
    FETCH_ANALYTICS_FAILURE, 
    FETCH_ANALYTICS_REQUEST, 
    FETCH_ANALYTICS_SUCCESS,
} from "./analyticsTypes";


const fetchAnalyticsRequest = () => {return {type : FETCH_ANALYTICS_REQUEST}}
const fetchAnalyticsSuccess = (payload) => {return {type : FETCH_ANALYTICS_SUCCESS , payload}}
const fetchAnalyticsFailure = (payload) => {return {type : FETCH_ANALYTICS_FAILURE , payload}}

export const fetchAnalytics = () => dispatch => {
     dispatch(fetchAnalyticsRequest())
     http.get(`user/analytics`, {headers : {authorization : token}})
     .then(({data}) => dispatch(fetchAnalyticsSuccess(data.analytics)))
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن لیست تغییرات قیمت"})
          dispatch(fetchAnalyticsFailure("خطای سرور در بخش گرفتن لیست تغییرات قیمت "))
     })
}
export const analyzeAction  = ({hash_id}) => dispatch => {
     http.put(`user/${hash_id}/analytics`, {} ,  {headers : {authorization : token}})
     .then(()=> {
          http.get(`user/analytics`,{headers : {authorization : token}})
          .then(({data}) => dispatch(fetchAnalyticsSuccess(data.analytics)))
     })
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش افزودن محصول به لیست تغییرات قیمت"})
          dispatch(fetchAnalyticsFailure("خطای سرور در بخش افزودن محصول به لیست تغییرات قیمت "))
     })
}