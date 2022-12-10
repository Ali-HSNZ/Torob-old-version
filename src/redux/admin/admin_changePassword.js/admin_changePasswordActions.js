import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { 
    ADMIN_CHANGE_PASSWORD_REQUEST, 
    ADMIN_CHANGE_PASSWORD_SUCCESS, 
    ADMIN_CHANGE_PASSWORD_FAILURE 
}  from "./admin_changePasswordTypes"

const token = new Cookies().get("userToken");


const changePasswordRequest = () => {
    return {type : ADMIN_CHANGE_PASSWORD_REQUEST}
}
const changePasswordSuccess = (payload) => {
    return {type : ADMIN_CHANGE_PASSWORD_SUCCESS , payload}
}
const changePasswordFailure = (payload) => {
    return {type : ADMIN_CHANGE_PASSWORD_FAILURE , payload}
}

// Change Admin Password Action
export const changeAdminPasswordAction = (values) => dispatch => {
    dispatch(changePasswordRequest())
    axios.post(`https://market-api.iran.liara.run/api/user/password`, values , {headers : {authorization : `Bearer ${token}`}})
    .then(() => {
        toast.success("رمز عبور جدید شما با موفقیت ثبت شد")
        dispatch(changePasswordSuccess("رمز عبور جدید شما با موفقیت ثبت شد"))
    })
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطای سرور در بخش تغییر رمز عبور مدیریت")
        dispatch(changePasswordFailure("خطای سرور در بخش تغییر رمز عبور مدیریت"))
    })
}