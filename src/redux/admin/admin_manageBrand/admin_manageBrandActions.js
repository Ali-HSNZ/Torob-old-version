import axios from "axios"
import { useRouter } from "next/router"
import toast from "react-hot-toast"
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
    const {state , page , limit,paramsName,paramsCompany} =  payload
    dispatch(admin_fetchBrandsRequest())
    axios.get(`https://market-api.iran.liara.run/api/admin/brands?state=${state || 'all'}&name=${paramsName || ""}&company=${paramsCompany || ""}&page=${page || 1}&limit=${limit || 12}` , {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) => dispatch(admin_fetchBrandsSuccess(data)))
    .catch(error => dispatch(admin_fetchBrandsFailure(error.response.data.message || "خطای سرور در بخش  گرفتن لیست دسته بندی")))
}

export const deleteBrand = ({state , page , limit,paramsName,paramsCompany,id}) => dispatch => {
    const payload = {state , page , limit,paramsName,paramsCompany}
    dispatch(admin_fetchBrandsRequest())
    axios.put(`https://market-api.iran.liara.run/api/admin/brands/${id}/state` ,{}, {headers : {authorization : `Bearer ${token}`}})
    .then(() => dispatch(fetchBrands(payload)))
    .catch(error => dispatch(admin_fetchBrandsFailure(error.response.data.message || "خطای سرور در بخش  گرفتن لیست دسته بندی")))
}

export const updateBrand = ({brandImage , companyName , faName ,enName  ,state , page , limit,paramsName,paramsCompany,id}) => dispatch => {
    const slug = enName.replace(/\s+/g, '-')
    const payload = {state , page , limit,paramsName,paramsCompany}
    dispatch(admin_fetchBrandsRequest())
    axios.post(`https://market-api.iran.liara.run/api/admin/brands/${id}/update`, {
        brand_name : faName,
        brand_english_name : enName,
        brand_company : companyName,
        slug,
        brand_logo : brandImage ? brandImage : null
    } , {headers : {'content-type' : 'multipart/form-data' ,authorization : `Bearer ${token}`,}})
    .then((data) =>{
        dispatch(fetchBrands(payload))
        const message = data.data.error
        if(message) toast.error(message);
        else toast.success('تغییرات با موفقیت ثبت شد')
    })
    .catch(error => {
        dispatch(fetchBrands(payload))
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        else dispatch(fetchProductsFailure( "خطا در ثبت تغییرات"))
    })
}

export const insertBrand = (payload) => dispatch => {
    const slug = payload.enName.replace(/\s+/g, '-')
    const {faName : brand_name, enName : brand_english_name, companyName : brand_company, brandImage, page, limit, } = payload;
    dispatch(admin_fetchBrandsRequest())
    axios.post(`https://market-api.iran.liara.run/api/admin/brands?page=${page}&limit=${limit}`, {brand_name, brand_english_name, brand_company, slug, brand_logo : brandImage ? brandImage : null } , {headers : {'content-type' : 'multipart/form-data' , authorization : `Bearer ${token}`}})
    .then((data) =>{
        dispatch(fetchBrands(payload))
        const message = data.data.error
        if(message) toast.error(message);
        else toast.success('برند با موفقیت ثبت شد')
    })
    .catch(error => {
        dispatch(fetchBrands(payload))
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        else dispatch(fetchProductsFailure( "خطا در ثبت برند"))
    })
}