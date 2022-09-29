import axios from "axios"
import Cookies from "universal-cookie"
import { 
   HISTORY_FAILURE,
   HISTORY_REQUEST,
   HISTORY_SUCCESS,
   HISTORY_REMOVED
} from "./historyTypes"


const historyRequest = () => { return {type : HISTORY_REQUEST}}
const historySuccess = (data) => { return {type : HISTORY_SUCCESS , payload : data}}
const historyFailure = (error) => { return {type : HISTORY_FAILURE ,  payload : error  ? error : ""}}
const historyRemoved = () => { return {type : HISTORY_REMOVED}}

export const insertHistory = (hashId) => {
    return (dispatch) => {
        dispatch(historyRequest())
        const token = new Cookies().get("userToken");
        axios.post(`https://project-torob-clone.iran.liara.run/api/user/${hashId}/history`, {} , {headers : {Authorization: `Bearer ${token}`}})
            .then(({data}) => dispatch(historySuccess(data)))
            .catch(error =>dispatch(historyFailure(error.response.data.message)))
    }
}
export const fetchHistory = () => {
    return (dispatch) => {
        dispatch(historyRequest())
        const token = new Cookies().get("userToken");
        axios.get(`https://project-torob-clone.iran.liara.run/api/user/history`, {headers : {Authorization: `Bearer ${token}`}})
            .then( ({data}) => dispatch(historySuccess(data.histories)))
            .catch(error => dispatch(historyFailure(error.response.data.message)))
    }
}
export const deleteHistory = () => {
    return (dispatch) => {
        dispatch(historyRequest())
        const token = new Cookies().get("userToken");
        axios.delete(`https://project-torob-clone.iran.liara.run/api/user/history`, {headers : {Authorization: `Bearer ${token}`}})
            .then(() => dispatch(historyRemoved()))
            .catch(error => dispatch(historyFailure(error.response.data.message)))
    }
}