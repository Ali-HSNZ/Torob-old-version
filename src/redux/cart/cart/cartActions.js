import http, { requestError, token } from "src/services/http";

const { 
    CART_ADD_TO_CART_REQUEST, 
    CART_ADD_TO_CART_SUCCESS, 
    CART_ADD_TO_CART_FAILURE,

     // Add To Cart Loading     
    CART_ADD_TO_CART_LOADING_REQUEST,
    CART_ADD_TO_CART_LOADING_SUCCESS,
    CART_ADD_TO_CART_LOADING_FAILURE,

     // Increase Or Decrease Product Loading     
    CART_INCREASE_OR_DECREASE_PRODUCT_LOADING_REQUEST,
    CART_INCREASE_OR_DECREASE_PRODUCT_LOADING_SUCCESS,
    CART_INCREASE_OR_DECREASE_PRODUCT_LOADING_FAILURE,

    FETCH_MAIN_CART_REQUEST,
    FETCH_MAIN_CART_SUCCESS,
    FETCH_MAIN_CART_FAILURE,

    CART_DETAIL
} = require("./cartTypes")

export const addToCartRequest = () => {return {type : CART_ADD_TO_CART_REQUEST}}
export const addToCartSuccess = (payload) => {return {type : CART_ADD_TO_CART_SUCCESS, payload}}
export const addToCartFailure = (payload) => {return {type : CART_ADD_TO_CART_FAILURE, payload}}

export const cartDetails = payload => {return {type : CART_DETAIL, payload}}

export const fetchMainCartRequest = () => {return {type : FETCH_MAIN_CART_REQUEST}}
export const fetchMainCartSuccess = (payload) => {return {type : FETCH_MAIN_CART_SUCCESS, payload}}
export const fetchMainCartFailure = (payload) => {return {type : FETCH_MAIN_CART_FAILURE, payload}}


export const addProductToCart = ({product_id,store_id}) => async dispatch => {
     dispatch({type : CART_ADD_TO_CART_LOADING_REQUEST , store_id})
     dispatch(addToCartRequest())
     await http.post(`user/cart/${product_id}`,{}, {headers : {authorization : token}})
     .then(({data}) => {
          dispatch({type : CART_ADD_TO_CART_LOADING_SUCCESS , store_id})
          dispatch(addToCartSuccess(data))
     })
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش افزودن کالا به سبد خرید"})
          dispatch({type : CART_ADD_TO_CART_LOADING_FAILURE , store_id})
          dispatch(addToCartFailure("خطای سرور در بخش افزودن کالا به سبد خرید "))
     })
}

export const increaseProductToCart = ({product_id , store_id}) => dispatch => {
     dispatch({type : CART_INCREASE_OR_DECREASE_PRODUCT_LOADING_REQUEST , store_id})
     dispatch(addToCartRequest())
     http.put(`user/cart/store/${store_id}/product/${product_id}/up`,{}, {headers : {authorization : token}})
     .then(({data}) => {
          dispatch({type : CART_INCREASE_OR_DECREASE_PRODUCT_LOADING_SUCCESS , store_id})
          dispatch(cartDetails(data))
     })
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش افزایش تعداد کالا"})
          dispatch({type : CART_INCREASE_OR_DECREASE_PRODUCT_LOADING_FAILURE , store_id})
          dispatch(addToCartFailure("خطای سرور در بخش افزایش تعداد کالا "))
     })
}

export const decreaseProductToCart = ({product_id , store_id}) => dispatch => {
     dispatch({type : CART_INCREASE_OR_DECREASE_PRODUCT_LOADING_REQUEST , store_id})
     dispatch(addToCartRequest())
     http.put(`user/cart/store/${store_id}/product/${product_id}/down`,{}, {headers : {authorization : token}})
     .then(({data}) => {
          dispatch({type : CART_INCREASE_OR_DECREASE_PRODUCT_LOADING_SUCCESS , store_id})
          dispatch(cartDetails(data))
     })
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش کاهش تعداد کالا در سبد خرید"})
          dispatch({type : CART_INCREASE_OR_DECREASE_PRODUCT_LOADING_FAILURE , store_id})
          dispatch(addToCartFailure("خطای سرور در بخش کاهش تعداد کالا در سبد خرید "))
     })
}

export const fetchMainCart = () => dispatch => {
     dispatch(fetchMainCartRequest())
     http.get(`user/cart`,{headers : {authorization : token}})
     .then(({data}) => dispatch(fetchMainCartSuccess(data.stores)))
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش اطلاعات فروشگاه در سبد خرید"})
          dispatch(fetchMainCartFailure("خطای سرور در بخش اطلاعات فروشگاه در سبد خرید "))
     })
}
//  Delete Store in Cart Page
export const deleteStoreInCart = ({store_id}) => dispatch => {
     dispatch(fetchMainCartRequest())
     http.delete(`user/cart/store/${store_id}`,{headers : {authorization : token}})
     .then(({data}) => {
          dispatch(cartDetails(data))
          dispatch(fetchMainCartSuccess(data.stores))
     })
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش حذف فروشگاه از سبد خرید"})
          dispatch(fetchMainCartFailure("خطای سرور در بخش حذف فروشگاه از سبد خرید "))
     })
}