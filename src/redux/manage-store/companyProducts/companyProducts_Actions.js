import axios from "axios"
import toast from "react-hot-toast";
import Cookies from "universal-cookie";

const { 
    STORE_FETCH_COMPANY_PRODUCTS_FAILURE, 
    STORE_FETCH_COMPANY_PRODUCTS_REQUEST, 
    STORE_FETCH_COMPANY_PRODUCTS_SUCCESS,
    
    STORE_FETCH_COMPANY_ONE_PRODUCT_REQUEST, 
    STORE_FETCH_COMPANY_ONE_PRODUCT_SUCCESS,
    STORE_FETCH_COMPANY_ONE_PRODUCT_FAILURE, 
} = require("./companyProducts_Types")

const token = new Cookies().get("userToken");

const fetchCompanyProductsRequest = () => {
    return {type : STORE_FETCH_COMPANY_PRODUCTS_REQUEST}
}
const fetchCompanyProductsSuccess = (payload) => {
    return {type : STORE_FETCH_COMPANY_PRODUCTS_SUCCESS , payload}
}
const fetchCompanyProductsFailure = (payload) => {
    return {type : STORE_FETCH_COMPANY_PRODUCTS_FAILURE , payload}
}

const fetchCompanyOneProductRequest = () => {
    return {type : STORE_FETCH_COMPANY_ONE_PRODUCT_REQUEST}
}
// Success => Products
const fetchCompanyOneProductSuccess = (payload) => {
    return {type : STORE_FETCH_COMPANY_ONE_PRODUCT_SUCCESS , payload}
}
// Failure => Error Message
const fetchCompanyOneProductFailure = (payload) => {
    return {type : STORE_FETCH_COMPANY_ONE_PRODUCT_FAILURE , payload}
}

export const fetchCompanyProducts = ({state, page, limit,order, paramsBrand,barcode, paramsCategory, name}) => dispatch => {
    dispatch(fetchCompanyProductsRequest())
    axios.get(encodeURI(`https://market-api.iran.liara.run/api/store/products?state=${state || "all"}&order=${order || "desc"}&title=${name || ""}&barcode=${barcode || ""}&category_id=${paramsCategory || ""}&brand_id=${paramsBrand ||""}&page=${page || 1}&limit=${limit || 12}`) , {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) => dispatch(fetchCompanyProductsSuccess(data)))
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطای سرور در بخش گرفتن لیست کالاها")
        dispatch(fetchCompanyProductsFailure("خطای سرور در بخش گرفتن لیست کالاها"))
    })
}
export const fetchProduct = ({id}) => dispatch => {
    dispatch(fetchCompanyOneProductRequest())
    axios.get(`https://market-api.iran.liara.run/api/store/products?id=${id}` , {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) => dispatch(fetchCompanyOneProductSuccess(data.product)))
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطای سرور در بخش گرفتن اطلاعات کالا")
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
        discount,
        commission,
    } = values
    axios.post(`https://market-api.iran.liara.run/api/store/products/${product_id}/update` ,{
        production_price : production_price.replace(/,/g, ''),
        consumer_price : consumer_price.replace(/,/g, ''),
        store_price : store_price.replace(/,/g, ''),
        per_unit : per_unit.replace(/,/g, ''),
        warehouse_count : warehouse_count.replace(/,/g, ''),
        delivery_description,
        store_note,
        discount : discount.replace(/,/g, '') ,
        commission : commission.replace(/,/g, '') ,
        production_date,
        expire_date,
        product_id : baseProduct_id,
    } , {headers : {'content-type' : 'multipart/form-data' ,authorization : `Bearer ${token}`,}})
    .then(() => {
        toast.success("تغییرات با موفقیت ثبت شد")
        setTimeout(() => {
            if(window){
                window.location.href="/store/manage-products/store-products"
            }
        }, 1200);
    })
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطای سرور در بخش ثبت کالا")
        dispatch(fetchCompanyProductsFailure("خطای سرور در بخش ثبت کالا"))
    })
}

export const deleteProduct = ({id}) => dispatch => {
    dispatch(fetchCompanyOneProductRequest())
    axios.put(`https://market-api.iran.liara.run/api/store/products/${id}/state` ,{}, {headers : {authorization : `Bearer ${token}`}})
    .then(() =>  dispatch(fetchProduct({id})))
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطای سرور در بخش حذف کالا")
        dispatch(fetchCompanyOneProductFailure("خطای سرور در بخش حذف کالا"))
    })
}