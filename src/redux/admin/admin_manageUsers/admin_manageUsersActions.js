import axios from "axios"
import toast from "react-hot-toast"
import Cookies from "universal-cookie"
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

const insertUserRequest = () => {
    return {type : ADMIN_INSERT_USER_REQUEST}
}
const insertUserSuccess = (payload) => {
    return {type : ADMIN_INSERT_USER_SUCCESS , payload }
}
const insertUserFailure = (payload) => {
    return {type : ADMIN_INSERT_USER_FAILURE , payload }
}

const fetchOneUserRequest = () => {
    return {type : ADMIN_FETCH_ONE_USER_REQUEST}
}
const fetchOneUserSuccess = (payload) => {
    return {type : ADMIN_FETCH_ONE_USER_SUCCESS , payload }
}
const fetchOneUserFailure = (payload) => {
    return {type : ADMIN_FETCH_ONE_USER_FAILURE , payload }
}

const insertUsersRequest = () => {
    return {type : ADMIN_FETCH_USERS_REQUEST}
}
const insertUsersSuccess = (payload) => {
    return {type : ADMIN_FETCH_USERS_SUCCESS , payload }
}
const insertUsersFailure = (payload) => {
    return {type : ADMIN_FETCH_USERS_FAILURE , payload }
}

const token = new Cookies().get("userToken");

export const fetchUsers = ({state,page,limit,order,full_name,number,national_code}) => dispatch => {
    dispatch(insertUsersRequest())
    axios.get(encodeURI(`https://market-api.iran.liara.run/api/admin/users?state=${state || "all"}&national_code=${national_code || ""}&full_name=${full_name || ""}&number=${number || ""}&order=${order || "desc"}&page=${page || 1}&limit=${limit || 12}`) , {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) => dispatch(insertUsersSuccess(data)))
    .catch(error => {
        const message = error?.response?.data?.message || "خطای سرور در بخش گرفتن لیست کاربران";
        dispatch(insertUsersFailure(message))
        toast.error(message)
    })
}

export const fetchOneUser = (pageId) => dispatch => {
    dispatch(fetchOneUserRequest())
    axios.get(encodeURI(`https://market-api.iran.liara.run/api/admin/users?id=${pageId}`) , {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) => {dispatch(fetchOneUserSuccess(data.user))})
    .catch(error => {
        const message = error?.response?.data?.message || "خطای سرور در بخش گرفتن اطلاعات یک کاربر";
        dispatch(fetchOneUserFailure(message))
        toast.error(message)
    })
}

export const deleteUser = (pageId) => dispatch => {
    dispatch(fetchOneUserRequest())
    axios.put(encodeURI(`https://market-api.iran.liara.run/api/admin/users/${pageId}/state`) ,{}, {headers : {authorization : `Bearer ${token}`}})
    .then(() => {dispatch(fetchOneUser(pageId))})
    .catch(error => {
        const message = error?.response?.data?.message || "خطای سرور در بخش حذف کاربر";
        dispatch(fetchOneUserFailure(message))
        toast.error(message)
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

    axios.post(`https://market-api.iran.liara.run/api/admin/users` ,{
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
    } , {headers : {'content-type' : 'multipart/form-data' ,authorization : `Bearer ${token}`,}})
    .then(() => {
        if(window){
            window.location.href="/admin/manage-users"
        }
    })
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطا در ثبت کاربر")
        dispatch(insertUserFailure("خطا در ثبت کاربر"))
    })
}

export const updateUser = ({values,profileImage,city,province,house_number,pageId}) => dispatch => {
    const {
        full_name ,
        national_code ,
        phone_number_primary , 
        phone_number_secondary,
        address_detail,
        address_postcode,
    } = values

    dispatch(fetchOneUserRequest())

    axios.post(`https://market-api.iran.liara.run/api/admin/users/${pageId}/update` ,{
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
    } , {headers : {'content-type' : 'multipart/form-data' ,authorization : `Bearer ${token}`,}})
    .then(() => {
        if(window){
            window.location.href="/admin/manage-users"
        }
    })
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطا در ثبت تغییرات")
        dispatch(fetchOneUserFailure("خطا در ثبت تغییرات"))
    })
}