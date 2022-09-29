import axios from "axios"
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
        axios.get(`https://project-torob-clone.iran.liara.run/api/user/analytics`, {headers : {Authorization : `Bearer ${token}`}})
            .then(({data}) => dispatch(fetchAnalyticsSuccess(data.analytics)))
            .catch(error => dispatch(fetchAnalyticsFailure(error.response.data.message)))
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
            .catch(error => dispatch(fetchAnalyticsFailure(error.response.data.message)))
    }
}