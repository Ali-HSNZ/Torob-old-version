import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import  { 
    FETCH_ADMIN_COUNT_REQUEST, 
    FETCH_ADMIN_COUNT_SUCCESS, 
    FETCH_ADMIN_COUNT_FAILURE 
} from "./admin_dataCountTypes";

const token = new Cookies().get("userToken");

const fetchAdminCountRequest = () => {
    return {type : FETCH_ADMIN_COUNT_REQUEST}
}
const fetchAdminCountSuccess = (payload) => {
    return {type : FETCH_ADMIN_COUNT_SUCCESS , payload}
}
const fetchAdminCountFailure = (payload) => {
    return {type : FETCH_ADMIN_COUNT_FAILURE , payload}
}

export const fetchAdminCount = () => dispatch => {
    dispatch(fetchAdminCountRequest())
    axios.get(`https://market-api.iran.liara.run/api/admin/counter` , {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) => dispatch(fetchAdminCountSuccess(data.count)))
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطای سرور در بخش گرفتن تعداد داده ها")
        dispatch(fetchAdminCountFailure("خطای سرور در بخش گرفتن تعداد داده ها"))
    })
}
