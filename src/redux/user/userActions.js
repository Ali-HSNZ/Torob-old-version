import axios from "axios"
import toast from "react-hot-toast"
import { 
    SIGNUP_USER_FAILURE, 
    SIGNUP_USER_REQUEST, 
    SIGNUP_USER_SUCCESS ,

    SIGNIN_USER_FAILURE, 
    SIGNIN_USER_REQUEST, 
    SIGNIN_USER_SUCCESS ,
    
} from "./userTypes"

const signupUserRequest = () => { return {type : SIGNUP_USER_REQUEST}}
const signupUserSuccess = (user) => { return {type : SIGNUP_USER_SUCCESS , payload : user}}
const signupUserFailure = (error) => {return {type : SIGNUP_USER_FAILURE , payload : error}}

const signinUserRequest = () => { return {type : SIGNIN_USER_REQUEST}}
const signinUserSuccess = (user) => { return {type : SIGNIN_USER_SUCCESS , payload : user}}
const signinUserFailure = (error) => {return {type : SIGNIN_USER_FAILURE , payload : error}}


export const userSignup = (phone_number) => {
    return (dispatch) => {
        dispatch(signupUserRequest())
        axios.post("https://project-torob-clone.iran.liara.run/api/login" , {phone_number})
        .then(response => {
            dispatch(signupUserSuccess(response.data))
            toast.success("کد احراز هویت : "+response.data.verification_code)
        }).catch(err => {
            dispatch(signupUserFailure(err.response.data.message))
            toast.error(err.response.data.message)
        })
    }
}

export const userSignin = (data) => {
    return (dispatch) => {
        dispatch(signinUserRequest())
        axios.post("https://project-torob-clone.iran.liara.run/api/verify" ,data)
        .then(response => {
            dispatch(signinUserSuccess(response.data))
            localStorage.setItem('userToken',response.data.API_TOKEN)
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
            const token = localStorage.getItem('userToken')
            axios.get("https://project-torob-clone.iran.liara.run/api/user/info", {headers : {Authorization : `Bearer ${token}`}})
        .then(response => {
            dispatch(signinUserSuccess(response.data.user))
        }).catch(err => {
            dispatch(signinUserFailure(err.response.data.message))
        })
    }
}

export const userLogout = () => {
    return (dispatch) => {
        localStorage.removeItem('userToken')
        dispatch(signinUserFailure("از حساب کاربری خود خارج شده اید"))
        toast.success("از حساب کاربری خود خارج شده اید")

    }
}