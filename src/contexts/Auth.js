import axios from "axios";
import { createContext , useContext, useEffect } from "react";
import { useReducerAsync } from "use-reducer-async";
import toast  from 'react-hot-toast';

const AuthContext = createContext()
const AuthContextDispacher = createContext()

const initailState =  {user : null , error : null , loading : false};

const reducer = (state , action) => {
    switch (action.type) {
        case "SINGIN_PENDING" : return {loading : true , data : null , error : null}
        case "SINGIN_SUCCESS" : return {loading : false , data : action.payload , error : null}
        case "SINGIN_REJECT" : return {loading : false , data : null , error : action.payload}
        default: return state
    }
}

const asyncActionHandlers = {
    SIGNUP : ({dispatch}) => (action) => {
        dispatch({type : "SINGIN_PENDING" })
         axios.post("https://project-torob-clone.iran.liara.run/api/login" , {phone_number : action.payload})
        .then(response => {
            dispatch({type : "SINGIN_SUCCESS" , payload : response.data})
            toast.success("کد احراز هویت : "+response.data.verification_code)
        }).catch(err => {
            dispatch({type : "SINGIN_REJECT" , payload : err.message})
            toast.success(err.message)
        })
    },
    SIGNIN: ({dispatch}) => (action) => {
        dispatch({type : "SINGIN_PENDING" })
        const userData = {phone_number : action.payload.phoneNumber , verification_code : action.payload.verification_code}
          axios.post("https://project-torob-clone.iran.liara.run/api/verify" , userData)
        .then(response => {
            dispatch({type : "SINGIN_SUCCESS" , payload : response.data})
            localStorage.setItem('userToken',response.data.API_TOKEN)
            toast.success(" با موفقیت وارد حساب کاربری خود شدید")
        }).catch(err => {
            dispatch({type : "SINGIN_REJECT" , payload : err.message})
            toast.error(err.response.data.message)
        })
    },
    SIGNOUT : {},
    LOAD_USER : ({dispatch}) => (action) => {
        dispatch({type : "SINGIN_PENDING" })
            const token = localStorage.getItem('userToken')
            axios.get("https://project-torob-clone.iran.liara.run/api/user/info", {headers : {Authorization : `Bearer ${token}`}})
        .then(response => {
            dispatch({type : "SINGIN_SUCCESS" , payload : response.data.user})
        }).catch(err => {
            dispatch({type : "SINGIN_REJECT" , payload : err.message})
        })
    }
}



const Auth = ({children}) => {
    const [user , dispatch] = useReducerAsync(reducer , initailState , asyncActionHandlers)
    useEffect(()=> {
        dispatch({type : "LOAD_USER" })
    },[])
    return (  
        <AuthContext.Provider value={user}>
            <AuthContextDispacher.Provider value={dispatch}>
                {children}
            </AuthContextDispacher.Provider>
        </AuthContext.Provider>        
    );
}
 
export default Auth;
export const useAuth = () => useContext(AuthContext)
export const useAuthDispacher = () => useContext(AuthContextDispacher)