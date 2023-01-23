import http, { requestError, token } from "src/services/http";
import { 
    ADMIN_FETCH_CATEGORIES_REQUEST, 
    ADMIN_FETCH_CATEGORIES_SUCCESS, 
    ADMIN_FETCH_CATEGORIES_FAILUE ,
} from "./admin_manageCategoryTypes";

const admin_fetchCategoriesRequest = () => {return {type : ADMIN_FETCH_CATEGORIES_REQUEST}}
const admin_fetchCategoriesSuccess = (payload) => {return {type : ADMIN_FETCH_CATEGORIES_SUCCESS , payload}}
const admin_fetchCategoriesFailure = (payload) => {return {type : ADMIN_FETCH_CATEGORIES_FAILUE , payload}}

export const fetchCategories = ({state , page , limit , paramsName , order}) => dispatch => {
     dispatch(admin_fetchCategoriesRequest())
     http.get(`admin/categories?state=${state || 'all'}&order=${order || 'desc'}&name=${paramsName || ""}&page=${page || 1}&limit=${limit || 12}` , {headers : {authorization : token}})
     .then(({data}) => dispatch(admin_fetchCategoriesSuccess(data)))
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن لیست دسته‌بندی ها"})        
          dispatch(admin_fetchCategoriesFailure("خطای سرور در بخش گرفتن لیست دسته‌بندی ها"))
     })
}

export const deleteCategory = ({id ,limit,page,paramsName,order,state}) => dispatch => {
     dispatch(admin_fetchCategoriesRequest())
     http.put(`admin/categories/${id}/state?order=${order || 'desc'}&state=${state || "all"}&name=${paramsName || ""}&page=${page || 1}&limit=${limit || 12}` , {}, {headers : {authorization : token}})
     .then(({data}) => dispatch(admin_fetchCategoriesSuccess(data)))
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش حذف دسته بندی"})
          dispatch(admin_fetchCategoriesFailure("خطای سرور در بخش حذف دسته بندی"))
     })
}

export const updateCategory = ({id,name,limit,page,order,paramsName,state}) => dispatch => {
    const slug = name.replace(/\s+/g, '-')
    dispatch(admin_fetchCategoriesRequest())
    http.post(`admin/categories/${id}/update?order=${order || 'desc'}&name=${paramsName || ""}&state=${state || "all"}&page=${page || 1}&limit=${limit || 12}` ,{category_name : name , category_slug : slug}, {headers : {authorization : token}})
    .then(({data}) => {
        dispatch(admin_fetchCategoriesSuccess(data))
        if(data.status === 401) requestError({error : null , defaultMessage : data.message});
    })
    .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش ویرایش دسته بندی"})
          dispatch(admin_fetchCategoriesFailure("خطای سرور در بخش ویرایش دسته بندی"))
    })
}

export const filterCategories = ({name,statusBrand}) => dispatch => {
    dispatch(admin_fetchCategoriesRequest())
    http.get(`admin/categories?name=${name || ""}&state=${statusBrand || 'all'}&limit=12` , {headers : {authorization : token}})
    .then(({data}) => dispatch(admin_fetchCategoriesSuccess(data)))
    .catch(error => {
        requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش فیلتر دسته بندی ها"})
        dispatch(admin_fetchCategoriesFailure("خطای سرور در بخش فیلتر دسته بندی ها"))
    })
} 

export const insertCategories = ({id,name,order,paramsName,state,page,limit}) => dispatch => {
    const slug = name.replace(/\s+/g, '-')
    dispatch(admin_fetchCategoriesRequest())
    http.post(`admin/categories?order=${order || 'desc'}&name=${paramsName || ""}&state=${state || "all"}&page=${page || 1}&limit=${limit || 12}` , {category_parent_id : id , category_name : name , slug} , {headers : {authorization : token}})
    .then(({data}) =>{
        dispatch(admin_fetchCategoriesSuccess(data))
        if(data.status === 401) requestError({error : null , defaultMessage : data.message});
    })
    .catch(error => {
        requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش ثبت دسته بندی"})
        dispatch(admin_fetchCategoriesFailure("خطای سرور در بخش ثبت دسته بندی"))
    })
}