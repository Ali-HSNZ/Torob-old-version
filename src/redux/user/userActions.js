import axios from "axios" 
import toast from "react-hot-toast"
import Cookies from "universal-cookie"
import { 
    AUTH_FAILURE, 
    AUTH_REQUEST, 
    AUTH_SUCCESS,
    AUTH_PANEL,
    CHANGE_PANEL_TYPE
} from "./userTypes"

// Auth Actions
const authRequest = () => { return {type : AUTH_REQUEST}}
const authSuccess = (payload) => { return {type : AUTH_SUCCESS , payload}}
const authFailure = (payload) => {return {type : AUTH_FAILURE , payload}}
const token = new Cookies().get("userToken");

// Sign Up User With Phone Number
export const userSignup = (phone_number) => {
    return (dispatch) => {
        dispatch(authRequest())
        axios.post("https://market-api.iran.liara.run/api/login" , {phone_number})
        .then(response => {
            dispatch(authSuccess(response.data))
            toast.success("کد احراز هویت : "+response.data.verification_code)
        }).catch(err => {
            const message = err.response?.data?.message || " user Signup - خطای سرور در بخش احراز هویت";
            toast.error(message)
            dispatch(authFailure(message))
        })
    }
}
// Sign in User With Phone Number & Code
export const userSignin = (data) => {
    return (dispatch) => {
        dispatch(authRequest())
        axios.post("https://market-api.iran.liara.run/api/verify" ,data)
        .then(response => {
            dispatch(authSuccess(response.data))
            new Cookies().set('userToken' ,response.data.API_TOKEN,{path:'/'} )
            toast.success(" با موفقیت وارد حساب کاربری خود شدید")
            setTimeout(() => window.location.reload(), 1000);
        })
        .catch(err => {
            const message = err.response?.data?.message || "خطای سرور در بخش احراز هویت";
            toast.error(message)
            dispatch(authFailure(message))
        })
    }
}

export const userSignin_withUserPass = (data) => dispatch => {
    dispatch(authRequest())
    axios.post("https://market-api.iran.liara.run/api/login/credentials" ,data)
    .then(response => {
        dispatch(authSuccess(response.data))
        new Cookies().set('userToken' ,response.data.API_TOKEN,{path:'/'} )
        toast.success(" با موفقیت وارد حساب کاربری خود شدید")
        setTimeout(() => window.location.reload(), 1000);
    })
    .catch(err => {
        const message = err.response?.data?.message || "خطای سرور در بخش احراز هویت";
        toast.error(message)
        dispatch(authFailure(message))
    })
}

// Load User Data When Site Refreshed
export const loadUserInfo = () => {
    return (dispatch) => {
        dispatch(authRequest())
        axios.get("https://market-api.iran.liara.run/api/user", {headers : {Authorization : `Bearer ${token}`}})
        .then(response => {
            dispatch(authSuccess(response.data.user))
        }).catch(err => {
            const message = err.response?.data?.message || "خطای سرور در بخش احراز هویت";
            toast.error(message)
            dispatch(authFailure(message))
        })
    }
}

export const userLogout = () => dispatch =>  {
    axios.delete("https://market-api.iran.liara.run/api/user/logout", {headers : {Authorization : `Bearer ${token}`}})
    new Cookies().remove("userToken",{path : '/'})
    window.location.reload()
}

export const authPanel = (payload) => dispatch => dispatch({type : AUTH_PANEL , payload })
export const changePanelType = (payload) => dispatch => dispatch({type : CHANGE_PANEL_TYPE , payload })