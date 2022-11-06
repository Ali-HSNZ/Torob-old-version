import axios from "axios" 
import { useRouter } from "next/router"
import toast from "react-hot-toast"
import Cookies from "universal-cookie"
import { 
    //? SignUp Types
    SIGNUP_USER_FAILURE, 
    SIGNUP_USER_REQUEST, 
    SIGNUP_USER_SUCCESS ,
    //? SignIn Types
    SIGNIN_USER_FAILURE, 
    SIGNIN_USER_REQUEST, 
    SIGNIN_USER_SUCCESS ,
    //? Authentication Panel
    AUTH_PANEL
    
} from "./userTypes"

//? SignUp Actions
const signupUserRequest = () => { return {type : SIGNUP_USER_REQUEST}}
const signupUserSuccess = (user) => { return {type : SIGNUP_USER_SUCCESS , payload : user}}
const signupUserFailure = (error) => {return {type : SIGNUP_USER_FAILURE , payload : error}}
//? SignIn Actions
const signinUserRequest = () => { return {type : SIGNIN_USER_REQUEST}}
const signinUserSuccess = (user) => { return {type : SIGNIN_USER_SUCCESS , payload : user}}
const signinUserFailure = (error) => {return {type : SIGNIN_USER_FAILURE , payload : error}}


export const userSignup = (phone_number) => {
    return (dispatch) => {
        dispatch(signupUserRequest())
        axios.post("https://market-api.iran.liara.run/api/login" , {phone_number})
        .then(response => {
            dispatch(signupUserSuccess(response.data))
            toast.success("کد احراز هویت : "+response.data.verification_code)
        }).catch(err => {
            dispatch(signupUserFailure(err.response?.data?.message ? err.response.data.message : "خطای سرور در بخش احراز هویت" ))
            toast.error(err.response?.data?.message ? err.response.data.message : "خطای سرور در بخش احراز هویت" )
        })
    }
}

export const userSignin = (data) => {
    return (dispatch) => {
        dispatch(signinUserRequest())
        axios.post("https://market-api.iran.liara.run/api/verify" ,data)
        .then(response => {
            window.location.reload()
            dispatch(signinUserSuccess(response.data))
            new Cookies().set('userToken' ,response.data.API_TOKEN,{path:'/'} )
            toast.success(" با موفقیت وارد حساب کاربری خود شدید")
        })
        .catch(err => {
            dispatch(signinUserFailure(err.response.data.message))
            toast.error(err.response.data.message)
        })
    }
}
//? Load User Data When Site Refreshed
export const loadUserInfo = () => {
    return (dispatch) => {
        dispatch(signinUserRequest())
        const token = new Cookies().get("userToken");
        axios.get("https://market-api.iran.liara.run/api/user", {headers : {Authorization : `Bearer ${token}`}})
        .then(response => {
            dispatch(signinUserSuccess(response.data.user))
        }).catch(err => {
            dispatch(signinUserFailure(err.response?.data?.message ? err.response.data.message : "خطای سرور در بخش احراز هویت" ))
        })
    }
}

export const userLogout = () => dispatch =>  {
    new Cookies().remove("userToken",{path : '/'})
    window.location.reload()
}

export const authPanel = (payload) => (dispatch) => dispatch({type : AUTH_PANEL , payload })