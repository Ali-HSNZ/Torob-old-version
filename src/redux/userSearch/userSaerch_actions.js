import http, { requestError, token } from "src/services/http"

import { 
    USER_SEARCH_SUGGESTED_REQUEST, 
    USER_SEARCH_SUGGESTED_SUCCESS, 
    USER_SEARCH_SUGGESTED_FAILURE,

    FETCH_SEARCH_DATA_REQUEST,
    FETCH_SEARCH_DATA_SUCCESS,
    FETCH_SEARCH_DATA_FAILURE,
} from "./userSaerch_types"

const userSearch_suggestedRequest = () => {return {type : USER_SEARCH_SUGGESTED_REQUEST}}
const userSearch_suggestedSuccess = payload => {return {type : USER_SEARCH_SUGGESTED_SUCCESS , payload}}
const userSearch_suggestedFailure = payload => {return {type : USER_SEARCH_SUGGESTED_FAILURE , payload}}


export const fetchSearchDataRequest = () => {return {type : FETCH_SEARCH_DATA_REQUEST}}
export const fetchSearchDataSuccess = payload => {return {type : FETCH_SEARCH_DATA_SUCCESS , payload}}
export const fetchSearchDataFailure = payload => {return {type : FETCH_SEARCH_DATA_FAILURE , payload}}


export const fetchUserSearchSuggested = query => dispatch => {
    dispatch(userSearch_suggestedRequest())
    http.get(`public/search/suggest?q=${query}`)
    .then(({data}) => dispatch(userSearch_suggestedSuccess(data)))
    .catch(error => dispatch(userSearch_suggestedFailure("خطا در بخش گرفتن عنوان های پیشنهادی در جستجو")))
} 