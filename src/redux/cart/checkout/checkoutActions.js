import http, { requestError, token } from "src/services/http";
import { cartDetails } from "../cart/cartActions";
import { 
    CHECKOUT_DECREASE_PRODUCT_REQUEST, 
    CHECKOUT_DECREASE_PRODUCT_SUCCESS, 
    CHECKOUT_DECREASE_PRODUCT_FAILURE, 
    
    CHECKOUT_INCREASE_PRODUCT_FAILURE, 
    CHECKOUT_INCREASE_PRODUCT_SUCCESS, 
    CHECKOUT_INCREASE_PRODUCT_REQUEST,

    CHECKOUT_MAIN_FETCH_REQUEST,
    CHECKOUT_MAIN_FETCH_SUCCESS, 
    CHECKOUT_MAIN_FETCH_FAILURE, 

    // Loading
    CHECKOUT_INCREASE_OR_DECREASE_PRODUCT_LOADING_REQUEST,
    CHECKOUT_INCREASE_OR_DECREASE_PRODUCT_LOADING_SUCCESS,
    CHECKOUT_INCREASE_OR_DECREASE_PRODUCT_LOADING_FAILURE
} from "./checkoutTypes";

const checkoutIncreaseRequest = () => {return {type : CHECKOUT_INCREASE_PRODUCT_REQUEST}}
const checkoutIncreaseSuccess = (payload) => {return {type : CHECKOUT_INCREASE_PRODUCT_SUCCESS, payload}}
const checkoutIncreaseFailure = (payload) => {return {type : CHECKOUT_INCREASE_PRODUCT_FAILURE, payload}}

const checkoutDecreaseRequest = () => {return {type : CHECKOUT_DECREASE_PRODUCT_REQUEST}}
const checkoutDecreaseSuccess = (payload) => {return {type : CHECKOUT_DECREASE_PRODUCT_SUCCESS, payload}}
const checkoutDecreaseFailure = (payload) => {return {type : CHECKOUT_DECREASE_PRODUCT_FAILURE, payload}}

export const checkoutMainFetchRequest = () => {return {type : CHECKOUT_MAIN_FETCH_REQUEST}}
export const checkoutMainFetchSuccess = (payload) => {return {type : CHECKOUT_MAIN_FETCH_SUCCESS, payload}}
export const checkoutMainFetchFailure = (payload) => {return {type : CHECKOUT_MAIN_FETCH_FAILURE, payload}}

// Loading
// payload => Store_id
const checkoutIncreaseOrDecreaseLoadingRequest = (payload) => {return {type : CHECKOUT_INCREASE_OR_DECREASE_PRODUCT_LOADING_REQUEST,payload}}
const checkoutIncreaseOrDecreaseLoadingSuccess = (payload) => {return {type : CHECKOUT_INCREASE_OR_DECREASE_PRODUCT_LOADING_SUCCESS, payload}}
const checkoutIncreaseOrDecreaseLoadingFailure = (payload) => {return {type : CHECKOUT_INCREASE_OR_DECREASE_PRODUCT_LOADING_FAILURE, payload}}

export const increaseProductInCheckout = ({product_id , store_id}) => dispatch => {
     dispatch(checkoutIncreaseOrDecreaseLoadingRequest(product_id))
     dispatch(checkoutIncreaseRequest())
     http.put(`user/cart/store/${store_id}/product/${product_id}/up/factor`,{}, {headers : {Authorization : token}})
     .then(({data}) => {
          dispatch(checkoutIncreaseOrDecreaseLoadingSuccess(product_id))
          dispatch(cartDetails(data))
          dispatch(checkoutIncreaseSuccess(data))
     })
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش افزایش تعداد کالا"})
          dispatch(checkoutIncreaseOrDecreaseLoadingFailure(product_id))
          dispatch(checkoutIncreaseFailure("خطای سرور در بخش افزایش تعداد کالا"))
     })
}

export const decreaseProductInCheckout = ({product_id , store_id}) => dispatch => {
     dispatch(checkoutIncreaseOrDecreaseLoadingRequest(product_id))
     dispatch(checkoutDecreaseRequest())
     http.put(`user/cart/store/${store_id}/product/${product_id}/down/factor`,{}, {headers : {authorization : token}})
     .then(({data}) => {
          dispatch(checkoutIncreaseOrDecreaseLoadingSuccess(product_id))
          dispatch(cartDetails(data))
          dispatch(checkoutDecreaseSuccess(data))
     })
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش کاهش تعداد کالا"})
          dispatch(checkoutIncreaseOrDecreaseLoadingFailure(product_id))
          dispatch(checkoutDecreaseFailure("خطای سرور در بخش کاهش تعداد کالا"))
     })
}

// Used in SSR Page
export const fetchMainCheckout = ({store_id}) => dispatch => {
    http.get(`user/cart/store/${store_id}`,{headers : {authorization : token}})
    .then(({data}) => dispatch(checkoutMainFetchSuccess(data)))
    .catch(error => {
        requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن اطلاعات فروشگاه در پیش فاکتور"})
        dispatch(checkoutMainFetchFailure("خطای سرور در بخش گرفتن اطلاعات فروشگاه در پیش فاکتور "))
    })
}

export const confirmFactor = ({store_id}) => dispatch => {
     http.post(`user/invoice/${store_id}` , {} ,{headers : {authorization : token}})
     .then(({data}) => {
          if(data.factor_state){
               if(window) window.location.href = '/user/invoices'
          }else{
               dispatch(checkoutMainFetchSuccess(data))
          }
     })
     .catch(error => {
         requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش ثبت  فاکتور"})
         dispatch(checkoutMainFetchFailure("خطای سرور در بخش ثبت  فاکتور "))
     })
 }
 