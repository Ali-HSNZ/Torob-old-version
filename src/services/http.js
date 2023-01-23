// Config Request And Show Meesages After Request

import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

axios.defaults.baseURL="https://market-api.iran.liara.run/api/"

const http = {
     get : axios.get,
     post : axios.post,
     delete  :axios.delete,
     put : axios.put
}
export default http

// Get User Token in Browser =>
export const token =  `Bearer ${new Cookies().get("userToken")}`;
export const returnTokenInServerSide = ({cookie}) => `Bearer ${new Cookies(cookie).get("userToken")}`; // use in getServerSideProps { cookie : ctx.req.headers.cookie , key : ? } 

// Show Request Error Message in Toast
export const requestError = ({error , defaultMessage}) =>  error ? error.forEach(error => toast.error(error)) : toast.error(defaultMessage);

// Show Request Success Message in Toast
export const requestSuccess = message => toast.success(message);

export const setCookies = ({key , value , config}) => new Cookies().set(key , value , config)
export const removeCookies = ({key , config}) => new Cookies().remove(key , config)