import { toast } from "react-toastify";
import Cookies from "universal-cookie"

const { default: axios } = require("axios")
const { 
    ADMIN_FETCH_CATEGORIES_REQUEST, 
    ADMIN_FETCH_CATEGORIES_SUCCESS, 
    ADMIN_FETCH_CATEGORIES_FAILUE ,
} = require("./admin_manageCategoryTypes")

const admin_fetchCategoriesRequest = () => {
    return {type : ADMIN_FETCH_CATEGORIES_REQUEST}
}
const admin_fetchCategoriesSuccess = (payload) => {
    return {type : ADMIN_FETCH_CATEGORIES_SUCCESS , payload} 
}
const admin_fetchCategoriesFailure = (payload) => {
    return {type : ADMIN_FETCH_CATEGORIES_FAILUE , payload} 
}

const token = new Cookies().get("userToken");


export const fetchCategories = (payload) => dispatch => {
    const {state , page , limit,paramsName,order} =  payload
    dispatch(admin_fetchCategoriesRequest())
    axios.get(`https://market-api.iran.liara.run/api/admin/categories?state=${state || 'all'}&order=${order || 'desc'}&name=${paramsName || ""}&page=${page || 1}&limit=${limit || 12}` , {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) => dispatch(admin_fetchCategoriesSuccess(data)))
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطای سرور در بخش گرفتن لیست دسته‌بندی ها")
        dispatch(admin_fetchCategoriesFailure("خطای سرور در بخش گرفتن لیست دسته‌بندی ها"))
    })
}

export const deleteCategory = ({id ,limit,page,paramsName,order,state}) => dispatch => {
    dispatch(admin_fetchCategoriesRequest())
    axios.put(`https://market-api.iran.liara.run/api/admin/categories/${id}/state?order=${order || 'desc'}&state=${state || "desc"}&name=${paramsName || ""}&page=${page || 1}&limit=${limit || 12}` , {}, {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) => dispatch(admin_fetchCategoriesSuccess(data)))
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطای سرور در بخش حذف دسته بندی")
        dispatch(admin_fetchCategoriesFailure("خطای سرور در بخش حذف دسته بندی"))
    })
}

export const updateCategory = ({id,name,limit,page,order,paramsName,state}) => dispatch => {
    const slug = name.replace(/\s+/g, '-')
    dispatch(admin_fetchCategoriesRequest())
    axios.post(`https://market-api.iran.liara.run/api/admin/categories/${id}/update?order=${order || 'desc'}&name=${paramsName || ""}&state=${state || "all"}&page=${page || 1}&limit=${limit || 12}` ,{category_name : name , category_slug : slug}, {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) => {
        dispatch(admin_fetchCategoriesSuccess(data))
        if(data.status === 401) toast.error(data.message);
    })
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطای سرور در بخش ویرایش دسته بندی")
        dispatch(admin_fetchCategoriesFailure("خطای سرور در بخش ویرایش دسته بندی"))
    })
}

export const filterCategories = ({name,statusBrand}) => dispatch => {
    dispatch(admin_fetchCategoriesRequest())
    axios.get(`https://market-api.iran.liara.run/api/admin/categories?name=${name || ""}&state=${statusBrand || 'all'}&limit=12` , {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) => dispatch(admin_fetchCategoriesSuccess(data)))
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطای سرور در بخش فیلتر دسته بندی ها")
        dispatch(admin_fetchCategoriesFailure("خطای سرور در بخش فیلتر دسته بندی ها"))
    })
} 

export const insertCategories = ({id,name,order,paramsName,state,page,limit}) => dispatch => {
    const slug = name.replace(/\s+/g, '-')
    dispatch(admin_fetchCategoriesRequest())
    axios.post(`https://market-api.iran.liara.run/api/admin/categories?order=${order || 'desc'}&name=${paramsName || ""}&state=${state || "all"}&page=${page || 1}&limit=${limit || 12}` , {category_parent_id : id , category_name : name , slug} , {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) =>{
        dispatch(admin_fetchCategoriesSuccess(data))
        if(data.status === 401) toast.error(data.message);
    })
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطای سرور در بخش ثبت دسته بندی")
        dispatch(admin_fetchCategoriesFailure("خطای سرور در بخش ثبت دسته بندی"))
    })
}
 