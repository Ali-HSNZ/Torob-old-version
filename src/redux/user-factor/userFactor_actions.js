import http, { requestError, token } from "src/services/http"
import { 
     USER_FETCH_INVOICES_REQUEST, 
     USER_FETCH_INVOICES_SUCCESS,
     USER_FETCH_INVOICES_FAILURE, 

     USER_ACTION_LOADING_REQUEST,
     USER_ACTION_LOADING_SUCCESS,
     USER_ACTION_LOADING_FAILURE,
} from "./userFactor_types"


export const user_fetchFactorsRequest = () => {return {type : USER_FETCH_INVOICES_REQUEST}}
export const user_fetchFactorsSuccess = payload => {return {type : USER_FETCH_INVOICES_SUCCESS , payload}}
export const user_fetchFactorsFailure = payload => { return {type : USER_FETCH_INVOICES_FAILURE , payload}}

const user_changeInvoiceStateLoadingRequest = (payload) => {return {type : USER_ACTION_LOADING_REQUEST , payload}}
const user_changeInvoiceStateLoadingSuccess = (payload) => {return {type : USER_ACTION_LOADING_SUCCESS , payload}}
const user_changeInvoiceStateLoadingFailure = (payload) => {return {type : USER_ACTION_LOADING_FAILURE , payload}}

export const user_fetchFactors = ({state , brand,category,name,order , title , limit , page}) => dispatch => {
     dispatch(user_fetchFactorsRequest())
     http.get(`user/invoices?page=${page || 1}&state=${state || "all"}&name=${name || ""}&title=${title || ""}&order=${order || "desc"}&category_id=${category || ""}&brand_id=${brand ||""}&limit=${limit || 12}` , {headers : {authorization : token}})
     .then(({data}) => dispatch(user_fetchFactorsSuccess(data)))
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن لیست فاکتورها"})
          dispatch(user_fetchFactorsFailure("خطای سرور در بخش گرفتن لیست فاکتورها"))
     })
} 

// Change Factor State
export const user_changeInvoiceState = ({invoiceId,comment}) => dispatch => {
     const currentComment = comment && comment?.[Object.keys(comment).find(state => Number(state) ===invoiceId)] || "";
     dispatch(user_changeInvoiceStateLoadingRequest(invoiceId))
     http.put(`user/invoices/${invoiceId}/state`, {state : "cancel",comment : currentComment} , {headers : {authorization : token}})
     .then(({data}) =>{
          dispatch(user_changeInvoiceStateLoadingSuccess(invoiceId))
          dispatch(user_fetchFactorsSuccess(data))
     })
     .catch(error => {
          dispatch(user_changeInvoiceStateLoadingFailure(invoiceId))
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش تفییرات فاکتور"})
          dispatch(user_fetchFactorsFailure("خطای سرور در بخش تفییرات فاکتور"))
     })
} 