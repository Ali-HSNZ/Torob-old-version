import http , { requestError, token } from "src/services/http";
import { 
    ADMIN_FETCH_USERS_REQUEST,
    ADMIN_FETCH_USERS_SUCCESS,
    ADMIN_FETCH_USERS_FAILURE,

    ADMIN_FETCH_ONE_USER_REQUEST,
    ADMIN_FETCH_ONE_USER_SUCCESS,
    ADMIN_FETCH_ONE_USER_FAILURE,

    ADMIN_INSERT_USER_REQUEST, 
    ADMIN_INSERT_USER_SUCCESS,
    ADMIN_INSERT_USER_FAILURE, 
} from "./admin_manageUsersTypes"

const insertUserRequest = () => {return {type : ADMIN_INSERT_USER_REQUEST}}
const insertUserSuccess = (payload) => {return {type : ADMIN_INSERT_USER_SUCCESS , payload }}
const insertUserFailure = (payload) => {return {type : ADMIN_INSERT_USER_FAILURE , payload }}

const fetchOneUserRequest = () => {return {type : ADMIN_FETCH_ONE_USER_REQUEST}}
export const fetchOneUserSuccess = (payload) => {return {type : ADMIN_FETCH_ONE_USER_SUCCESS , payload }}
export const fetchOneUserFailure = (payload) => {return {type : ADMIN_FETCH_ONE_USER_FAILURE , payload }}

const fetchUsersRequest = () => {return {type : ADMIN_FETCH_USERS_REQUEST}}
export const fetchUsersSuccess = (payload) => {return {type : ADMIN_FETCH_USERS_SUCCESS , payload }}
export const fetchUsersFailure = (payload) => {return {type : ADMIN_FETCH_USERS_FAILURE , payload }}


export const fetchUsers = ({state,page,limit,order,full_name,number,national_code}) => dispatch => {
     dispatch(fetchUsersRequest())
     http.get(encodeURI(`admin/users?state=${state || "all"}&national_code=${national_code || ""}&full_name=${full_name || ""}&number=${number || ""}&order=${order || "desc"}&page=${page || 1}&limit=${limit || 12}`) , {headers : {authorization : token}})
     .then(({data}) => dispatch(fetchUsersSuccess(data)))
     .catch(error => {
          requestError({error : error?.response?.data?.errors ,defaultMessage : "خطای سرور در بخش گرفتن لیست کاربران"})
          dispatch(fetchUsersFailure("خطای سرور در بخش گرفتن لیست کاربران"))
     })
}
// Used in SSR
export const fetchOneUser = (pageId) => dispatch => {
     dispatch(fetchOneUserRequest())
     http.get(encodeURI(`admin/users?id=${pageId}`) , {headers : {authorization : token}})
     .then(({data}) => {dispatch(fetchOneUserSuccess(data.user))})
     .catch(error => {
          requestError({error : error?.response?.data?.errors ,defaultMessage : "خطای سرور در بخش گرفتن اطلاعات یک کاربر"})
          dispatch(fetchOneUserFailure("خطای سرور در بخش گرفتن اطلاعات یک کاربر"))
     })
}

export const deleteUser = (pageId) => dispatch => {
    dispatch(fetchOneUserRequest())
    http.put(encodeURI(`admin/users/${pageId}/state`) ,{}, {headers : {authorization : token}})
    .then(() => {dispatch(fetchOneUser(pageId))})
    .catch(error => {
          requestError({error : error?.response?.data?.errors ,defaultMessage : "خطای سرور در بخش حذف کاربر"})
          dispatch(fetchOneUserFailure("خطای سرور در بخش حذف کاربر"))
    })
}

export const insertUser = ({values,profileImage,city,province,house_number}) => dispatch => {
     const {
          full_name ,
          national_code ,
          phone_number_primary , 
          phone_number_secondary,
          address_detail,
          address_postcode,
     } = values
     dispatch(insertUserRequest())
     http.post(`admin/users` ,{
          full_name ,
          national_code ,
          phone_number_primary , 
          phone_number_secondary,
          address_detail,
          address_postcode,
          house_number,
          profile_image : profileImage,
          address_city : city,
          address_province : province,
     } , {headers : {'content-type' : 'multipart/form-data' ,authorization : token}})
     .then(() => { if(window){ window.location.href="/admin/manage-users" } })
     .catch(error => {
          requestError({error : error?.response?.data?.errors ,defaultMessage : "خطا در ثبت کاربر"})
          dispatch(insertUserFailure("خطا در ثبت کاربر"))
     })
}

export const updateUser = ({values,profileImage,city,province,house_number,pageId}) => dispatch => {
     const { full_name , national_code , phone_number_primary , phone_number_secondary, address_detail, address_postcode, password} = values
     dispatch(fetchOneUserRequest())
     http.post(`admin/users/${pageId}/update` ,{
          full_name ,
          national_code ,
          phone_number_primary , 
          phone_number_secondary,
          address_detail,
          address_postcode,
          house_number,
          profile_image : profileImage,
          address_city : city,
          password,
          address_province : province,
     } , {headers : {'content-type' : 'multipart/form-data' ,authorization : token}})
     .then(() => { if(window){ window.location.href="/admin/manage-users" } })
     .catch(error => {
          requestError({error : error?.response?.data?.errors ,defaultMessage : "خطا در ثبت تغییرات"})
          dispatch(fetchOneUserFailure("خطا در ثبت تغییرات"))
     })
}