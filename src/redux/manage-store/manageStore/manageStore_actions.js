import http, { requestError, requestSuccess, token } from "src/services/http";

import { 
    STORE_FETCH_PRODUCTS_BASES_FAILURE, 
    STORE_FETCH_PRODUCTS_BASES_SUCCESS, 
    STORE_FETCH_PRODUCTS_BASES_REQUEST,

    STORE_FETCH_BRANDS_REQUEST,
    STORE_FETCH_BRANDS_SUCCESS,
    STORE_FETCH_BRANDS_FAILURE,

    STORE_FETCH_CATEGORIES_REQUEST,
    STORE_FETCH_CATEGORIES_SUCCESS,
    STORE_FETCH_CATEGORIES_FAILURE,

    STORE_INSERT_PRODUCT_REQUEST,
    STORE_INSERT_PRODUCT_SUCCESS,
    STORE_INSERT_PRODUCT_FAILURE,

    FETCH_STORE_COUNT_REQUEST, 
    FETCH_STORE_COUNT_SUCCESS, 
    FETCH_STORE_COUNT_FAILURE, 

    STORE_CHANGE_PASSWORD_REQUEST, 
    STORE_CHANGE_PASSWORD_SUCCESS, 
    STORE_CHANGE_PASSWORD_FAILURE,

} from "./manageStore_types";

const changeStorePassword_request = () => {return {type : STORE_CHANGE_PASSWORD_REQUEST}}
const changeStorePassword_success = (payload) => {return {type : STORE_CHANGE_PASSWORD_SUCCESS , payload}}
const changeStorePassword_failure = (payload) => {return {type : STORE_CHANGE_PASSWORD_FAILURE , payload}}

export const fetchBaseProductsRequest = () => {return {type : STORE_FETCH_PRODUCTS_BASES_REQUEST}}
const fetchBaseProductsSuccess = (payload) => {return {type : STORE_FETCH_PRODUCTS_BASES_SUCCESS , payload}}
const fetchBaseProductsFailure = (payload) => {return {type : STORE_FETCH_PRODUCTS_BASES_FAILURE , payload}}

const fetchBrandsRequest = () => {return {type : STORE_FETCH_BRANDS_REQUEST}}
export const fetchBrandsSuccess = (payload) => { return {type : STORE_FETCH_BRANDS_SUCCESS , payload}}
export const fetchBrandsFailure = (payload) => {return {type : STORE_FETCH_BRANDS_FAILURE , payload}}

const fetchCategoriesRequest = () => {return {type : STORE_FETCH_CATEGORIES_REQUEST}}
export const store_fetchCategoriesSuccess = (payload) => { return {type : STORE_FETCH_CATEGORIES_SUCCESS , payload}}
export const store_fetchCategoriesFailure = (payload) => {return {type : STORE_FETCH_CATEGORIES_FAILURE , payload}}

const insertStoreProductRequest = () => {return {type : STORE_INSERT_PRODUCT_REQUEST}}
const insertStoreProductSuccess = (payload) => { return {type : STORE_INSERT_PRODUCT_SUCCESS , payload}}
const insertStoreProductFailure = (payload) => {return {type : STORE_INSERT_PRODUCT_FAILURE , payload}}

const fetchStoreCountRequest = () => {return {type : FETCH_STORE_COUNT_REQUEST}}
export const fetchStoreCountSuccess = (payload) => {return {type : FETCH_STORE_COUNT_SUCCESS , payload}}
export const fetchStoreCountFailure = (payload) => {return {type : FETCH_STORE_COUNT_FAILURE , payload}
}

// Change Store Password Action
export const changeStorePasswordAction = (values) => dispatch => {
     dispatch(changeStorePassword_request())
     http.post(`user/password`, values , {headers : {authorization : token}})
     .then(() => {
          requestSuccess("رمز عبور جدید شما با موفقیت ثبت شد")
          dispatch(changeStorePassword_success("رمز عبور جدید شما با موفقیت ثبت شد"))
     })
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش تغییر رمز فروشگاه"})
          dispatch(changeStorePassword_failure("خطای سرور در بخش تغییر رمز فروشگاه"))
     })
}

export const fetchStoreCount = () => dispatch => {
    dispatch(fetchStoreCountRequest())
    http.get(`store/counter` , {headers : {authorization : token}})
    .then(({data}) => dispatch(fetchStoreCountSuccess(data.count)))
    .catch(error => {
      requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن تعداد کالا ها"})
        dispatch(fetchStoreCountFailure("خطای سرور در بخش گرفتن تعداد کالا ها"))
    })
  }

export const fetchBaseProducts = ( {page,limit, brand,barcode, category ,name}) => dispatch => {
     dispatch(fetchBaseProductsRequest())
     http.get(encodeURI(`products/bases?title=${name || ""}&barcode=${barcode || ""}&category_id=${category || ""}&brand_id=${brand ||""}&page=${page || 1}&limit=${limit || 12}`) , {headers : {authorization : token}})
     .then(({data}) =>  dispatch(fetchBaseProductsSuccess(data)))
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن لیست کالاها"})
          dispatch(fetchBaseProductsFailure("خطای سرور در بخش گرفتن لیست کالاها"))
     })
}

export const fetchCategories = () => dispatch => {
     dispatch(fetchCategoriesRequest())
     http.get(`products/categories?list=1` , {headers : {authorization : token}})
     .then(({data}) => dispatch(store_fetchCategoriesSuccess(data)))
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن لیست دسته‌بندی ها"})
          dispatch(store_fetchCategoriesFailure("خطای سرور در بخش گرفتن لیست دسته‌بندی ها"))
     })
}

export const fetchBrands = () => dispatch => {
     dispatch(fetchBrandsRequest())
     http.get(`products/brands?list=1` , {headers : {authorization : token}})
     .then(({data}) => dispatch(fetchBrandsSuccess(data)))
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن لیست برندها"})
          dispatch(fetchBrandsFailure("خطای سرور در بخش گرفتن لیست برندها"))
     })
}

export const insertStoreProduct = ({product_id,values,production_date,expire_date}) => dispatch => {
     dispatch(insertStoreProductRequest())
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
          product_discounts,
     } = values
     http.post(`store/products` ,{
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
          product_id,
          product_discounts,
          discounts_count : product_discounts.length,
     } , {headers : {'content-type' : 'multipart/form-data' ,authorization : token,}})
     .then(() => {
          requestSuccess("کالا با موفقیت ثبت شد")
          setTimeout(() => { if(window){ window.location.href="/store/manage-products/insert"}}, 1200);
     })
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش ثبت کالا"})
          dispatch(insertStoreProductFailure("خطای سرور در بخش ثبت کالا"))
     })
}