import http, { requestError, token } from "src/services/http";

import { 
     ADMIN_FETCH_PRODUCTS_REQUEST, 
     ADMIN_FETCH_PRODUCTS_SUCCESS, 
     ADMIN_FETCH_PRODUCTS_FAILURE, 

     ADMIN_FETCH_ONE_PRODUCT_REQUEST, 
     ADMIN_FETCH_ONE_PRODUCT_SUCCESS, 
     ADMIN_FETCH_ONE_PRODUCT_FAILURE, 

     ADMIN_INSERT_ONE_PRODUCT_REQUEST,
     ADMIN_INSERT_ONE_PRODUCT_SUCCESS,
     ADMIN_INSERT_ONE_PRODUCT_FAILURE,

     ADMIN_FETCH_SUB_1_REQUEST, 
     ADMIN_FETCH_SUB_1_SUCCESS, 
     ADMIN_FETCH_SUB_1_FAILURE, 

     ADMIN_FETCH_SUB_2_REQUEST, 
     ADMIN_FETCH_SUB_2_SUCCESS, 
     ADMIN_FETCH_SUB_2_FAILURE, 

     ADMIN_FETCH_SUB_3_REQUEST, 
     ADMIN_FETCH_SUB_3_SUCCESS, 
     ADMIN_FETCH_SUB_3_FAILURE, 
     
     ADMIN_FETCH_BRANDS_REQUEST, 
     ADMIN_FETCH_BRANDS_SUCCESS, 
     ADMIN_FETCH_BRANDS_FAILURE, 

     ADMIN_FETCH_CATEGORIES_REQUEST,
     ADMIN_FETCH_CATEGORIES_SUCCESS,
     ADMIN_FETCH_CATEGORIES_FAILURE,
} from "./admin_manageProductsTypes";

const fetchProductsRequest = () => {return {type : ADMIN_FETCH_PRODUCTS_REQUEST}}
const fetchProductsSuccess = (payload) => { return {type : ADMIN_FETCH_PRODUCTS_SUCCESS , payload}}
const fetchProductsFailure = (payload) => {return {type : ADMIN_FETCH_PRODUCTS_FAILURE , payload}}

const fetchOneProductRequest = () => {return {type : ADMIN_FETCH_ONE_PRODUCT_REQUEST}}
export const fetchOneProductSuccess = (payload) => { return {type : ADMIN_FETCH_ONE_PRODUCT_SUCCESS , payload : payload || null}}
export const fetchOneProductFailure = (payload) => {return {type : ADMIN_FETCH_ONE_PRODUCT_FAILURE , payload}}

const insertProductRequest = () => {return {type : ADMIN_INSERT_ONE_PRODUCT_REQUEST}}
const insertProductSuccess = () => { return {type : ADMIN_INSERT_ONE_PRODUCT_SUCCESS}}
const insertProductFailure = (payload) => {return {type : ADMIN_INSERT_ONE_PRODUCT_FAILURE , payload}}

const fetchBrandsRequest = () => {return {type : ADMIN_FETCH_BRANDS_REQUEST}}
export const fetchBrandsSuccess = (payload) => { return {type : ADMIN_FETCH_BRANDS_SUCCESS , payload}}
export const fetchBrandsFailure = (payload) => {return {type : ADMIN_FETCH_BRANDS_FAILURE , payload}}

const fetchSub1Request = () => {return {type : ADMIN_FETCH_SUB_1_REQUEST}}
const fetchSub1Success = (payload) => { return {type : ADMIN_FETCH_SUB_1_SUCCESS , payload}}
const fetchSub1Failure = (payload) => {return {type : ADMIN_FETCH_SUB_1_FAILURE , payload}}

const fetchSub2Request = () => {return {type : ADMIN_FETCH_SUB_2_REQUEST}}
const fetchSub2Success = (payload) => { return {type : ADMIN_FETCH_SUB_2_SUCCESS , payload}}
const fetchSub2Failure = (payload) => {return {type : ADMIN_FETCH_SUB_2_FAILURE , payload}}

const fetchSub3Request = () => {return {type : ADMIN_FETCH_SUB_3_REQUEST}}
const fetchSub3Success = (payload) => { return {type : ADMIN_FETCH_SUB_3_SUCCESS , payload}}
const fetchSub3Failure = (payload) => {return {type : ADMIN_FETCH_SUB_3_FAILURE , payload}}

const fetchCategoriesRequest = () => {return {type : ADMIN_FETCH_CATEGORIES_REQUEST}}
export const admin_fetchCategoriesSuccess = (payload) => { return {type : ADMIN_FETCH_CATEGORIES_SUCCESS , payload}}
export const admin_fetchCategoriesFailure = (payload) => {return {type : ADMIN_FETCH_CATEGORIES_FAILURE , payload}}


export const insertProduct = ({categoryId ,barcode, brandId , product_title , product_description , productImages}) => dispatch => {
     dispatch(insertProductRequest())
     http.post(`admin/products` ,{
          title : product_title,
          barcode,
          description : product_description,
          brand_id : brandId,
          category_id : categoryId,
          product_image : productImages,
          images_count : productImages.length,
     } , {headers : {'content-type' : 'multipart/form-data' ,authorization : token}})
     .then(() => { if(window) window.location.href="/admin/manage-products" })
     .catch(error => {
          requestError({error :  error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش ثبت کالا"})
          dispatch(insertProductFailure("خطای سرور در بخش ثبت کالا"))
     })
}

export const editProductAction = ({categoryId ,barcode, brandId , product_title , product_description , productImages , id}) => dispatch => {
     dispatch(fetchOneProductRequest())
     http.post(`admin/products/${id}/update` ,{
          title : product_title,
          barcode,
          description : product_description,
          brand_id : brandId,
          category_id : categoryId,
          images_count : productImages.length,
          product_image : productImages,
     } , {headers : {'content-type' : 'multipart/form-data' , authorization : token}})
     .then(() => { if(window) window.location.href="/admin/manage-products" })
     .catch(error => {
          requestError({error :  error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش ویرایش اطلاعات کالا"})
          dispatch(fetchOneProductFailure("خطای سرور در بخش ویرایش اطلاعات کالا"))
     })
}

export const deleteImage = (id) => dispatch => {
     dispatch(fetchOneProductRequest())
     http.delete(`admin/products/images/${id}`, {headers : {authorization : token}})
     .then(() =>  dispatch(fetchOneProductSuccess()))
     .catch(error => {
          requestError({error :  error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش حذف تصویر"})
          dispatch(fetchOneProductFailure("خطای سرور در بخش حذف تصویر"))
     })
}

export const fetchSub1 = (id) => dispatch => {
     dispatch(fetchSub1Request())
     http.get(`admin/categories/list/${id}` , {headers : {authorization : token}})
     .then(({data}) => dispatch(fetchSub1Success(data.categories)))
     .catch(error => {
          requestError({error :  error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن لیست زیردسته اول"})
          dispatch(fetchSub1Failure("خطای سرور در بخش گرفتن لیست زیردسته اول"))
     })
} 

export const fetchSub2 = (id) => dispatch => {
     dispatch(fetchSub2Request())
     http.get(`admin/categories/list/${id}` , {headers : {authorization : token}})
     .then(({data}) => dispatch(fetchSub2Success(data.categories)))
     .catch(error => {
          dispatch(fetchSub2Failure("خطای سرور در بخش گرفتن لیست زیردسته دوم"))
          requestError({error :  error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن لیست زیردسته دوم"})
     })
} 

export const fetchSub3 = (id) => dispatch => {
    dispatch(fetchSub3Request())
    http.get(`admin/categories/list/${id}` , {headers : {authorization : token}})
    .then(({data}) => dispatch(fetchSub3Success(data.categories)))
    .catch(error => {
        requestError({error :  error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن لیست زیردسته سوم"})
        dispatch(fetchSub3Failure("خطای سرور در بخش گرفتن لیست زیردسته سوم"))
    })
} 

export const fetchProducts = ({state, page, limit,order, paramsBrand,barcode, paramsCategory, name}) => dispatch => {
     dispatch(fetchProductsRequest())
     http.get(encodeURI(`admin/products?state=${state || "all"}&order=${order || "desc"}&title=${name || ""}&barcode=${barcode || ""}&category_id=${paramsCategory || ""}&brand_id=${paramsBrand ||""}&page=${page || 1}&limit=${limit || 12}`) ,
          {headers : {authorization : token}})
     .then(({data}) => dispatch(fetchProductsSuccess(data)))
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن لیست کالاها"})
          dispatch(fetchProductsFailure("خطای سرور در بخش گرفتن لیست کالاها"))
     })
}
// Used in SSR
export const fetchProduct = (id) => dispatch => {
     dispatch(fetchOneProductRequest())
     http.get(`admin/products?id=${id}` , {headers : {authorization : token}})
     .then(({data}) => dispatch(fetchOneProductSuccess(data.product)))
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن اطلاعات کالا"})
          dispatch(fetchOneProductFailure("خطای سرور در بخش گرفتن اطلاعات کالا"))
     })
} 
export const deleteProduct = ({id}) => dispatch => {
     dispatch(fetchOneProductRequest())
     http.put(`admin/products/${id}/state` ,{}, {headers : {authorization : token}})
     .then(() =>  dispatch(fetchProduct(id)))
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش حذف کالا"})
          dispatch(fetchOneProductFailure("خطای سرور در بخش حذف کالا"))
     })
}
export const fetchCategories = () => dispatch => {
     dispatch(fetchCategoriesRequest())
     http.get(`admin/categories?list=1` , {headers : {authorization : token}})
     .then(({data}) => dispatch(admin_fetchCategoriesSuccess(data)))
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن لیست دسته‌بندی"})
          dispatch(admin_fetchCategoriesFailure("خطای سرور در بخش گرفتن لیست دسته‌بندی"))
     })
}
// Use In SSR
export const fetchMainCategories = () => dispatch => {
     dispatch(fetchCategoriesRequest())
     http.get(`admin/categories/list` , {headers : {authorization : token}})
     .then(({data}) => dispatch(admin_fetchCategoriesSuccess(data)))
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن لیست دسته‌بندی های اصلی"})
          dispatch(admin_fetchCategoriesFailure("خطای سرور در بخش گرفتن لیست دسته‌بندی های اصلی"))
     })
}
// Use In SSR
export const fetchBrands = () => dispatch => {
     dispatch(fetchBrandsRequest())
     http.get(`admin/brands?list=1` , {headers : {authorization : token}})
     .then(({data}) => dispatch(fetchBrandsSuccess(data)))
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن لیست برندها"})
          dispatch(fetchBrandsFailure("خطای سرور در بخش گرفتن لیست برندها"))
     })
}