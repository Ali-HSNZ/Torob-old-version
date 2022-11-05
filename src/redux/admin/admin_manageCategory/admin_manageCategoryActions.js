import { useRouter } from "next/router"
import toast from "react-hot-toast"
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
    const {state , page , limit,paramsName} =  payload
    dispatch(admin_fetchCategoriesRequest())
    axios.get(`https://market-api.iran.liara.run/api/admin/categories?state=${state || 'all'}&name=${paramsName || ""}&page=${page || 1}&limit=${limit || 12}` , {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) => dispatch(admin_fetchCategoriesSuccess(data)))
    .catch(error => {
        const message =  error?.response?.data?.message ? error?.response?.data?.message : "خطای سرور در بخش  گرفتن لیست دسته بندی";
        dispatch(admin_fetchCategoriesFailure(message))
    })
}

export const deleteCategory = ({id ,limit,page,paramsName,state}) => dispatch => {
    const payload = { limit,page,paramsName,state}
    dispatch(admin_fetchCategoriesRequest())
    axios.put(`https://market-api.iran.liara.run/api/admin/categories/${id}/state` , {}, {headers : {authorization : `Bearer ${token}`}})
    .then(() => dispatch(fetchCategories(payload)))
    .catch(error => dispatch(admin_fetchCategoriesFailure(error?.response?.data?.message ? error?.response?.data?.message : "خطای سرور در بخش حذف دسته بندی")))
}

export const updateCategory = ({id,name,limit,page,paramsName,state}) => dispatch => {
    const payload = { limit,page,paramsName,state}
    const slug = name.replace(/\s+/g, '-')
    dispatch(admin_fetchCategoriesRequest())
    axios.post(`https://market-api.iran.liara.run/api/admin/categories/${id}/update` ,{category_name : name , category_slug : slug}, {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) =>{
        dispatch(fetchCategories(payload))
        if(data.error){
            toast.error(data.error)
        }
    })
    .catch(error => dispatch(admin_fetchCategoriesFailure(error?.response?.data?.message ? error?.response?.data?.message : "خطای سرور در بخش ویرایش دسته بندی")))
}

export const filterCategories = (payload) => dispatch => {
    dispatch(admin_fetchCategoriesRequest())
    axios.get(`https://market-api.iran.liara.run/api/admin/categories?name=${payload.name}&state=${payload.statusBrand}&limit=30` , {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) => {
        const availableCategories = data.categories.filter(n => n)
        dispatch(admin_fetchCategoriesSuccess(availableCategories))
        
    })
    .catch(error => dispatch(admin_fetchCategoriesFailure(error?.response?.data?.message || "خطای سرور در بخش  گرفتن لیست دسته بندی")))
} 

export const insertCategories = ({id,name , limit,page,paramsName,state}) => dispatch => {
    const payload = { limit,page,paramsName,state}
    const slug = name.replace(/\s+/g, '-')
    dispatch(admin_fetchCategoriesRequest())
    axios.post(`https://market-api.iran.liara.run/api/admin/categories` , {category_parent_id : id , category_name : name , slug} , {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) => {
        dispatch(fetchCategories(payload))
        if(data.error){
            toast.error(data.error)
        }
    })
    .catch(error => dispatch(admin_fetchCategoriesFailure(error?.response?.data?.message || "خطای سرور در بخش افزودن دسته بندی")))
}
 