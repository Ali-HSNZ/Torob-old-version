import http, { requestError, requestSuccess, token } from "src/services/http";
import { 
     ADMIN_CHANGE_PASSWORD_REQUEST, 
     ADMIN_CHANGE_PASSWORD_SUCCESS, 
     ADMIN_CHANGE_PASSWORD_FAILURE 
}  from "./admin_changePasswordTypes"

// Change Password Actions =>
const changePasswordRequest = () => {return {type : ADMIN_CHANGE_PASSWORD_REQUEST}}
const changePasswordSuccess = (payload) => {return {type : ADMIN_CHANGE_PASSWORD_SUCCESS , payload}}
const changePasswordFailure = (payload) => {return {type : ADMIN_CHANGE_PASSWORD_FAILURE , payload}}

// Change Admin Password Action
export const changeAdminPasswordAction = (values) => dispatch => {
     dispatch(changePasswordRequest())
     http.post(`user/password`, values , {headers : {authorization : token}})
     .then(() => {
          requestSuccess("رمز عبور جدید شما با موفقیت ثبت شد")
          dispatch(changePasswordSuccess("رمز عبور جدید شما با موفقیت ثبت شد"))
     })
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش تغییر رمز عبور مدیریت"})
          dispatch(changePasswordFailure("خطای سرور در بخش تغییر رمز عبور مدیریت"))
     })
}