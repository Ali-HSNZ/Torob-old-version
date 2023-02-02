import http, { removeCookies, requestError, requestSuccess, setCookies, token } from "src/services/http";
import { cartDetails } from "../cart/cart/cartActions";
import { 
    AUTH_FAILURE, 
    AUTH_REQUEST, 
    AUTH_SUCCESS,
    AUTH_PANEL,
    CHANGE_PANEL_TYPE
} from "./userTypes"

// Auth Actions
export const authRequest = () => { return {type : AUTH_REQUEST}}
export const authSuccess = (payload) => { return {type : AUTH_SUCCESS , payload}}
export const authFailure = (payload) => {return {type : AUTH_FAILURE , payload}}

// Sign Up User With Phone Number
// export const userSignup = (phone_number) =>  dispatch => {

export const userSignin = (data) => dispatch => {
     dispatch(authRequest())
     http.post("https://market-api.iran.liara.run/api/login/credentials" ,data)
     .then(({data}) => {
          dispatch(authSuccess(data.user))
          setCookies({key : "userToken" , value : data.API_TOKEN , config : {path:'/'} })
          requestSuccess(" با موفقیت وارد حساب کاربری خود شدید")
          if(data.is_password === false){
               setTimeout(() => window.location.href = '/store/change-password', 1000);
          }else{
               setTimeout(() => window.location.reload(), 1000);
          }
     })
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطا در بخش احراز هویت"})
          dispatch(authFailure("خطا در بخش احراز هویت"))
     })
}

// Load User Data When Site Refreshed
export const loadUserInfo = () => dispatch => {
     dispatch(authRequest())
     http.get("user", {headers : {authorization : token}})
     .then(({data}) => {
          dispatch(authSuccess(data.user))
          dispatch(cartDetails(data))
     }).catch(error => {
          // requestError({error : error?.response?.data?.errors , defaultMessage : "خطا در بخش احراز هویت"})
          dispatch(authFailure("خطا در بخش احراز هویت"))
     })
}

export const userLogout = () => () =>  {
    http.delete("user/logout", {headers : {authorization : token}})
    removeCookies({key : "userToken" , config : {path : '/'}})
    if(window) window.location.reload()
}

// Example => dispatch(authPanel({type : 'userPass' , isOpen : true})) 
export const authPanel = (payload) => dispatch => dispatch({type : AUTH_PANEL , payload })

// Example => type is Normal Or userPass
export const changePanelType = (payload) => dispatch => dispatch({type : CHANGE_PANEL_TYPE , payload })