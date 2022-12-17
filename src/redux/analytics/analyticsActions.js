import axios from "axios"
import { toast } from "react-toastify";
import Cookies from 'universal-cookie';
import { 
    FETCH_ANALYTICS_FAILURE, 
    FETCH_ANALYTICS_REQUEST, 
    FETCH_ANALYTICS_SUCCESS,
    INSERT_ANALYZE_LOADING
} from "./analyticsTypes";

const fetchAnalyticsRequest = (payload) => {return {type : FETCH_ANALYTICS_REQUEST , hash_id : payload}}
const fetchAnalyticsSuccess = (payload) => {return {type : FETCH_ANALYTICS_SUCCESS , payload}}
const fetchAnalyticsFailure = (payload) => {return {type : FETCH_ANALYTICS_FAILURE , payload}}

export const fetchAnalytics = () => {
    const token = new Cookies().get("userToken");
    return (dispatch) => {
        dispatch(fetchAnalyticsRequest())
        axios.get(`https://market-api.iran.liara.run/api/user/analytics`, {headers : {Authorization : `Bearer ${token}`}})
            .then(({data}) => dispatch(fetchAnalyticsSuccess(data.analytics)))
            .catch(error => {
                const serverMessage_list = error?.response?.data?.errors
                if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
                if(!serverMessage_list) toast.error("خطای سرور در بخش گرفتن لیست تغییرات قیمت ")
                dispatch(fetchAnalyticsFailure("خطای سرور در بخش گرفتن لیست تغییرات قیمت "))
            })
    }
}
export const analyzeAction  = ({hash_id}) => {
    const token = new Cookies().get("userToken");
    return (dispatch) => {
        dispatch({type : INSERT_ANALYZE_LOADING , hash_id})
        axios.put(`https://project-torob-clone.iran.liara.run/api/user/${hash_id}/analytics`, {} ,  {headers : {Authorization : `Bearer ${token}`}})
            .then(()=> {
                axios.get(`https://project-torob-clone.iran.liara.run/api/user/analytics`,{headers : {Authorization : `Bearer ${token}`}})
                .then(({data}) => dispatch(fetchAnalyticsSuccess(data.analytics)))
            })
            .catch(error => {
                const serverMessage_list = error?.response?.data?.errors
                if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
                if(!serverMessage_list) toast.error("خطای سرور در بخش افزودن محصول به لیست تغییرات قیمت ")
                dispatch(fetchAnalyticsFailure("خطای سرور در بخش افزودن محصول به لیست تغییرات قیمت "))
            })
    }
}