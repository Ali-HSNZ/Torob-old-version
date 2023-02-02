import http, { requestError, token } from "src/services/http";
import { 
     STORE_FETCH_FACTORES_REQUEST, 
     STORE_FETCH_FACTORES_SUCCESS, 
     STORE_FETCH_FACTORES_FAILURE,

     STORE_ACTION_LOADING_REQUEST,
     STORE_ACTION_LOADING_SUCCESS,
     STORE_ACTION_LOADING_FAILURE,
} from "./manageFactors_types";

export const store_fetchFactorsRequest = () => {return {type : STORE_FETCH_FACTORES_REQUEST}}
export const store_fetchFactorsSuccess = payload => {return {type : STORE_FETCH_FACTORES_SUCCESS , payload}}
export const store_fetchFactorsFailure = payload => { return {type : STORE_FETCH_FACTORES_FAILURE , payload}}


const store_changeInvoiceStateLoadingRequest = (payload) => {return {type : STORE_ACTION_LOADING_REQUEST , payload}}
const store_changeInvoiceStateLoadingSuccess = (payload) => {return {type : STORE_ACTION_LOADING_SUCCESS , payload}}
const store_changeInvoiceStateLoadingFailure = (payload) => {return {type : STORE_ACTION_LOADING_FAILURE , payload}}


export const store_fetchFactors = ({state , brand,category,name,number,order , title , limit , page}) => dispatch => {
     dispatch(store_fetchFactorsRequest())
     http.get(`store/invoices?page=${page || 1}&state=${state || "all"}&number=${number || ""}&name=${name || ""}&title=${title || ""}&order=${order || "desc"}&category_id=${category || ""}&brand_id=${brand ||""}&limit=${limit || 12}` , {headers : {authorization : token}})
     .then(({data}) => dispatch(store_fetchFactorsSuccess(data)))
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن لیست فاکتورها"})
          dispatch(store_fetchFactorsFailure("خطای سرور در بخش گرفتن لیست فاکتورها"))
     })
} 


export const store_changeInvoiceState = ({invoiceId,state,comment}) => dispatch => {
     const currentComment = comment && comment?.[Object.keys(comment).find(state => Number(state) ===invoiceId)] || "";
     dispatch(store_changeInvoiceStateLoadingRequest(invoiceId))
     http.put(`store/invoices/${invoiceId}/state`, {state,comment : currentComment} , {headers : {authorization : token}})
     .then(({data}) =>{
          dispatch(store_changeInvoiceStateLoadingSuccess(invoiceId))
          dispatch(store_fetchFactorsSuccess(data))
     })
     .catch(error => {
          dispatch(store_changeInvoiceStateLoadingFailure(invoiceId))
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش تفییرات فاکتور"})
          dispatch(store_fetchFactorsFailure("خطای سرور در بخش تفییرات فاکتور"))
     })
} 