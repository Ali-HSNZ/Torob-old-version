import http, { requestError, token } from "src/services/http"
import { 
     HISTORY_REQUEST,
     HISTORY_SUCCESS,
     HISTORY_FAILURE,
} from "./historyTypes"


const historyRequest = () => { return {type : HISTORY_REQUEST}}
export const historySuccess = (payload) => { return {type : HISTORY_SUCCESS , payload}}
export const historyFailure = (payload) => { return {type : HISTORY_FAILURE ,  payload}}

export const insertHistory = (slug) => dispatch => {
     dispatch(historyRequest())
     http.post(`user/history/${slug}`, {} , {headers : {authorization: token}})
     .then(({data}) => dispatch(historySuccess(data)))
     .catch(error => dispatch(historyFailure(error.response.data.message)))
}

export const fetchHistory = () => dispatch => {
     dispatch(historyRequest())
     http.get(`user/history`, {headers : {authorization: token}})
     .then( ({data}) => dispatch(historySuccess(data.histories)))
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن لیست محصولات بازدیدشده"})
          dispatch(historyFailure("خطای سرور در بخش گرفتن لیست محصولات بازدیدشده"))
     })
}
export const deleteHistory = () => dispatch => {
     dispatch(historyRequest())
     http.put(`user/history`, {} ,{headers : {authorization : token}})
     .then(({data}) => dispatch(historySuccess(data.products)))
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش حذف محصول از لیست بازدید شده"})
          dispatch(historyFailure("خطای سرور در بخش حذف محصول از لیست بازدید شده"))
     })
}