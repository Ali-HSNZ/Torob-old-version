import http, { requestError, token } from "src/services/http";

import { 
     FETCH_LIKES_FAILURE, 
     FETCH_LIKES_REQUEST, 
     FETCH_LIKES_SUCCESS,

     // Actions Loading     
     ADD_OR_REMOVE_PRODUCT_IN_LIKES_LOADING_REQUEST,
     ADD_OR_REMOVE_PRODUCT_IN_LIKES_LOADING_SUCCESS,
     ADD_OR_REMOVE_PRODUCT_IN_LIKES_LOADING_FAILURE,
} from "./likeTypes";

const fetchLikeRequest = () => {return {type : FETCH_LIKES_REQUEST,}}
export const fetchLikeSuccess = (payload) => {return {type : FETCH_LIKES_SUCCESS , payload}}
export const fetchLikeFailure = (payload) => {return {type : FETCH_LIKES_FAILURE , payload}}

// Payload is Product Id
const addOrRemoveProductInLikesLoadingRequest = (payload) => {return {type : ADD_OR_REMOVE_PRODUCT_IN_LIKES_LOADING_REQUEST , payload}}
const addOrRemoveProductInLikesLoadingSuccess = (payload) => {return {type : ADD_OR_REMOVE_PRODUCT_IN_LIKES_LOADING_SUCCESS , payload}}
const addOrRemoveProductInLikesLoadingFailure = (payload) => {return {type : ADD_OR_REMOVE_PRODUCT_IN_LIKES_LOADING_FAILURE , payload}}

// Use in SSR
export const fetchLikes = () => dispatch => {
     dispatch(fetchLikeRequest())
     http.get(`public/user/favorites`, {headers : {authorization : token}})
     .then(({data}) => dispatch(fetchLikeSuccess(data.products)))
     .catch(error => {
          requestError({defaultMessage : "خطا در بخش گرفتن محصولات پسندیده شده" , error : error?.response?.data?.errors})
          dispatch(fetchLikeFailure("خطای سرور در بخش گرفتن محصولات پسندیده شده"))
     })
}

export const likedAction  = ({product_id}) => dispatch => {
     dispatch(fetchLikeRequest())
     dispatch(addOrRemoveProductInLikesLoadingRequest(product_id))
     http.put(`user/favorites/${product_id}`, {} ,  {headers : {authorization : token}})
     .then(({data})=> {
          dispatch(addOrRemoveProductInLikesLoadingSuccess(product_id))
          dispatch(fetchLikeSuccess(data.products))
     })
     .catch(error => {
          dispatch(addOrRemoveProductInLikesLoadingFailure(product_id))
          requestError({defaultMessage : "خطا در بخش افزودن محصول به لیست پسندیده شده ها" , error : error?.response?.data?.errors})
          dispatch(fetchLikeFailure("خطای سرور در بخش افزودن محصول به لیست پسندیده شده ها "))
     })
}