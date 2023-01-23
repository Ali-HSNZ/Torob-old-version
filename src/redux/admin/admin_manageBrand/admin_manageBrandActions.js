import http, { requestError, requestSuccess, token } from "src/services/http";
import { 
     ADMIN_FETCH_BRANDS_REQUEST, 
     ADMIN_FETCH_BRANDS_SUCCESS, 
     ADMIN_FETCH_BRANDS_FAILURE 
} from "./admin_manageBrandTypes";

const admin_fetchBrandsRequest = () => {return {type : ADMIN_FETCH_BRANDS_REQUEST}}
const admin_fetchBrandsSuccess = (payload) => {return {type : ADMIN_FETCH_BRANDS_SUCCESS , payload}}
const admin_fetchBrandsFailure = (payload) => {return {type : ADMIN_FETCH_BRANDS_FAILURE , payload}}

export const fetchBrands = ({state , page ,order, limit,paramsName,paramsCompany}) => dispatch => {
     dispatch(admin_fetchBrandsRequest())
     http.get(`admin/brands?state=${state || 'all'}&order=${order || 'desc'}&name=${paramsName || ""}&company=${paramsCompany || ""}&page=${page || 1}&limit=${limit || 12}` , {headers : {authorization : token}})
     .then(({data}) => dispatch(admin_fetchBrandsSuccess(data)))
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن لیست برندها"})
          dispatch(admin_fetchBrandsFailure("خطای سرور در بخش گرفتن لیست برندها"))
     })
}
export const deleteBrand = ({state ,order, page , limit , paramsName , paramsCompany , id}) => dispatch => {
     dispatch(admin_fetchBrandsRequest())
     http.put(`admin/brands/${id}/state?state=${state || 'all'}&order=${order || 'desc'}&name=${paramsName || ""}&company=${paramsCompany || ""}&page=${page || 1}&limit=${limit || 12}` ,{}, {headers : {authorization : token}})
     .then(({data}) => dispatch(admin_fetchBrandsSuccess(data)))
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش حذف برند"})
          dispatch(admin_fetchBrandsFailure("خطای سرور در بخش حذف برند"))
     })
}

export const updateBrand = ({brandImage , order, companyName , faName ,enName  ,state , page , limit,paramsName,paramsCompany,id}) => dispatch => {
     const brand_logo = brandImage.selectedFile ? brandImage.selectedFile : brandImage.imageUrl ? 0 : 1;
     const slug = enName.replace(/\s+/g, '-')
     dispatch(admin_fetchBrandsRequest())
     http.post(`admin/brands/${id}/update?state=${state || 'all'}&order=${order || 'desc'}&name=${paramsName || ""}&company=${paramsCompany || ""}&page=${page || 1}&limit=${limit || 12}`, {
          brand_name : faName, 
          brand_english_name : enName,
          brand_company : companyName,
          slug,
          brand_logo,
     } , {headers : {'content-type' : 'multipart/form-data' ,authorization : token}})
     .then(({data}) =>{
          dispatch(admin_fetchBrandsSuccess(data))
          if(data.status === 401) requestSuccess(data.message);
     })
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش ویرایش برند"})
          dispatch(admin_fetchBrandsFailure("خطای سرور در بخش ویرایش برند"))
     })
}

export const insertBrand = (payload) => dispatch => {
     const slug = payload.enName.replace(/\s+/g, '-')
     const {paramsName,paramsCompany,state,faName : brand_name, enName : brand_english_name, companyName : brand_company, brandImage, page, limit,order } = payload;
     dispatch(admin_fetchBrandsRequest())
     http.post(`admin/brands?page=${page}&limit=${limit}state=${state || 'all'}&order=${order || 'desc'}&name=${paramsName || ""}&company=${paramsCompany || ""}&page=${page || 1}&limit=${limit || 12}`, {brand_name, brand_english_name, brand_company, slug, brand_logo : brandImage || null } , {headers : {'content-type' : 'multipart/form-data' , authorization : token}})
     .then(({data}) =>{
          dispatch(admin_fetchBrandsSuccess(data))
          if(data.status === 401) requestError({error : null , defaultMessage : data.message});
     })
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش ثبت برند"})
          dispatch(admin_fetchBrandsFailure("خطای سرور در بخش ثبت برند"))
     })
}