import http, { requestError, requestSuccess, token } from "src/services/http";

import { 
    STORE_FETCH_COMPANY_PRODUCTS_FAILURE, 
    STORE_FETCH_COMPANY_PRODUCTS_REQUEST, 
    STORE_FETCH_COMPANY_PRODUCTS_SUCCESS,
    
    STORE_FETCH_COMPANY_ONE_PRODUCT_REQUEST, 
    STORE_FETCH_COMPANY_ONE_PRODUCT_SUCCESS,
    STORE_FETCH_COMPANY_ONE_PRODUCT_FAILURE, 
} from "./companyProducts_Types"

export const fetchCompanyProductsRequest = () => {return {type : STORE_FETCH_COMPANY_PRODUCTS_REQUEST}}
const fetchCompanyProductsSuccess = (payload) => {return {type : STORE_FETCH_COMPANY_PRODUCTS_SUCCESS , payload}}
const fetchCompanyProductsFailure = (payload) => {return {type : STORE_FETCH_COMPANY_PRODUCTS_FAILURE , payload}}

const fetchCompanyOneProductRequest = () => {return {type : STORE_FETCH_COMPANY_ONE_PRODUCT_REQUEST}}
export const fetchCompanyOneProductSuccess = (payload) => {return {type : STORE_FETCH_COMPANY_ONE_PRODUCT_SUCCESS , payload}}
export const fetchCompanyOneProductFailure = (payload) => {return {type : STORE_FETCH_COMPANY_ONE_PRODUCT_FAILURE , payload}}

export const fetchCompanyProducts = ({state,page,limit,order, brand,barcode,  category ,name}) => dispatch => {
     dispatch(fetchCompanyProductsRequest())
     http.get(encodeURI(`store/products?state=${state || "all"}&order=${order || "desc"}&title=${name || ""}&barcode=${barcode || ""}&category_id=${category || ""}&brand_id=${brand ||""}&page=${page || 1}&limit=${limit || 12}`) , {headers : {authorization : token}})
     .then(({data}) => dispatch(fetchCompanyProductsSuccess(data)))
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن لیست کالاها"})
          dispatch(fetchCompanyProductsFailure("خطای سرور در بخش گرفتن لیست کالاها"))
     })
}
// Use in SSR
export const fetchProduct = ({id}) => dispatch => {
     dispatch(fetchCompanyOneProductRequest())
     http.get(`store/products?id=${id}` , {headers : {authorization : token}})
     .then(({data}) => dispatch(fetchCompanyOneProductSuccess(data.product)))
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن اطلاعات کالا"})
          dispatch(fetchCompanyOneProductFailure("خطای سرور در بخش گرفتن اطلاعات کالا"))
     })
} 

export const updateStoreProduct = ({product_id,baseProduct_id,values,production_date,expire_date}) => dispatch => {
     dispatch(fetchCompanyOneProductRequest())
     const {
          production_price,
          consumer_price,
          store_price,
          per_unit,
          warehouse_count,
          delivery_description,
          store_note,
          cash_payment_discount,
          commission, 
          product_discounts
     } = values
     http.post(`store/products/${product_id}/update` ,{
          production_price : production_price.replace(/,/g, ''),
          consumer_price : consumer_price.replace(/,/g, ''),
          store_price : store_price.replace(/,/g, ''),
          per_unit : per_unit.replace(/,/g, ''),
          warehouse_count : warehouse_count.replace(/,/g, ''),
          delivery_description,
          store_note,
          cash_payment_discount : cash_payment_discount.replace(/,/g, '') ,
          commission : commission.replace(/,/g, '') ,
          production_date,
          expire_date,
          product_id : baseProduct_id,
          product_discounts,
          discounts_count : product_discounts.length,

     } , {headers : {'content-type' : 'multipart/form-data' ,authorization : token}})
     .then(() => {
          requestSuccess("تغییرات با موفقیت ثبت شد")
          setTimeout(() => { if(window){ window.location.href="/store/manage-products/store-products" } }, 1200);
     })
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش ثبت کالا"})
          dispatch(fetchCompanyOneProductFailure("خطای سرور در بخش ویرایش کالا"))
     })
}

export const deleteProduct = ({id}) => dispatch => {
     dispatch(fetchCompanyOneProductRequest())
     http.put(`store/products/${id}/state` ,{}, {headers : {authorization : token}})
     .then(() =>  dispatch(fetchProduct({id})))
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش حذف کالا"})
          dispatch(fetchCompanyOneProductFailure("خطای سرور در بخش حذف کالا"))
     })
}