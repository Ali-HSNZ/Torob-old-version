import axios from "axios"
import { toast } from "react-toastify";
import Cookies from "universal-cookie"


const token = new Cookies().get("userToken");
const { ADMIN_FETCH_BRANDS_REQUEST, ADMIN_FETCH_BRANDS_SUCCESS, ADMIN_FETCH_BRANDS_FAILURE } = require("./admin_manageBrandTypes")

const admin_fetchBrandsRequest = () => {
    return {type : ADMIN_FETCH_BRANDS_REQUEST}
}
const admin_fetchBrandsSuccess = (payload) => {
    return {type : ADMIN_FETCH_BRANDS_SUCCESS , payload}
}
const admin_fetchBrandsFailure = (payload) => {    
    return {type : ADMIN_FETCH_BRANDS_FAILURE , payload}
}
export const fetchBrands = (payload) => dispatch => {
    const {state , page ,order, limit,paramsName,paramsCompany} =  payload
    dispatch(admin_fetchBrandsRequest())
    axios.get(`https://market-api.iran.liara.run/api/admin/brands?state=${state || 'all'}&order=${order || 'desc'}&name=${paramsName || ""}&company=${paramsCompany || ""}&page=${page || 1}&limit=${limit || 12}` , {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) => dispatch(admin_fetchBrandsSuccess(data)))
    .catch(error => {
        const message = 'خطای سرور در بخش گرفتن لیست برندها'
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error(message)
        dispatch(admin_fetchBrandsFailure(message))
    })
}

export const deleteBrand = ({state ,order, page , limit,paramsName,paramsCompany,id}) => dispatch => {
    dispatch(admin_fetchBrandsRequest())
    axios.put(`https://market-api.iran.liara.run/api/admin/brands/${id}/state?state=${state || 'all'}&order=${order || 'desc'}&name=${paramsName || ""}&company=${paramsCompany || ""}&page=${page || 1}&limit=${limit || 12}` ,{}, {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) => dispatch(admin_fetchBrandsSuccess(data)))
    .catch(error => {
        const message = 'خطای سرور در بخش حذف برند'
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error(message)
        dispatch(admin_fetchBrandsFailure(message))
    })
}

export const updateBrand = ({brandImage , order, companyName , faName ,enName  ,state , page , limit,paramsName,paramsCompany,id}) => dispatch => {
    const brand_logo = brandImage.selectedFile ? brandImage.selectedFile : brandImage.imageUrl ? 0 : 1;
    const slug = enName.replace(/\s+/g, '-')
    dispatch(admin_fetchBrandsRequest())
    axios.post(`https://market-api.iran.liara.run/api/admin/brands/${id}/update?state=${state || 'all'}&order=${order || 'desc'}&name=${paramsName || ""}&company=${paramsCompany || ""}&page=${page || 1}&limit=${limit || 12}`, {
        brand_name : faName,
        brand_english_name : enName,
        brand_company : companyName,
        slug,
        brand_logo : brand_logo
    } , {headers : {'content-type' : 'multipart/form-data' ,authorization : `Bearer ${token}`,}})
    .then(({data}) =>{
        dispatch(admin_fetchBrandsSuccess(data))
        if(data.status === 401) toast.error(data.message);
    })
    .catch(error => {
        const message = 'خطای سرور در بخش ویرایش برند'
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error(message)
        dispatch(admin_fetchBrandsFailure(message))
    })
}

export const insertBrand = (payload) => dispatch => {
    const slug = payload.enName.replace(/\s+/g, '-')
    const {paramsName,paramsCompany,state,faName : brand_name, enName : brand_english_name, companyName : brand_company, brandImage, page, limit,order } = payload;
    dispatch(admin_fetchBrandsRequest())
    axios.post(`https://market-api.iran.liara.run/api/admin/brands?page=${page}&limit=${limit}state=${state || 'all'}&order=${order || 'desc'}&name=${paramsName || ""}&company=${paramsCompany || ""}&page=${page || 1}&limit=${limit || 12}`, {brand_name, brand_english_name, brand_company, slug, brand_logo : brandImage || null } , {headers : {'content-type' : 'multipart/form-data' , authorization : `Bearer ${token}`}})
    .then(({data}) =>{
        dispatch(admin_fetchBrandsSuccess(data))
        if(data.status === 401) toast.error(data.message);
    })
    .catch(error => {
        const message = 'خطای سرور در بخش ثبت برند'
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error(message)
        dispatch(admin_fetchBrandsFailure(message))
    })
}