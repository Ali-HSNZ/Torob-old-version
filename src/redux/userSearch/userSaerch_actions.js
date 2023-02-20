import http, { requestError, token } from "src/services/http"

import { 
    USER_SEARCH_SUGGESTED_REQUEST, 
    USER_SEARCH_SUGGESTED_SUCCESS, 
    USER_SEARCH_SUGGESTED_FAILURE 
} from "./userSaerch_types"

const userSearch_suggestedRequest = () => {
    return {type : USER_SEARCH_SUGGESTED_REQUEST}
}
const userSearch_suggestedSuccess = payload => {
    return {type : USER_SEARCH_SUGGESTED_SUCCESS , payload}
}
const userSearch_suggestedFailure = payload => {
    return {type : USER_SEARCH_SUGGESTED_FAILURE , payload}
}

export const fetchUserSearchSuggested = query => dispatch => {
    dispatch(userSearch_suggestedRequest())
    http.get(`public/search/suggest?q=${query}`)
    .then(({data}) => dispatch(userSearch_suggestedSuccess(data)))
    .catch(error => {
        requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن لیست فاکتورها"})
        dispatch(userSearch_suggestedFailure("خطای سرور در بخش گرفتن لیست فاکتورها"))
    })
} 