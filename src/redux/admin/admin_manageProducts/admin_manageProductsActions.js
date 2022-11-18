import axios from "axios"
import toast from "react-hot-toast"
import Cookies from "universal-cookie"

const { 
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

} = require("./admin_manageProductsTypes")

const fetchProductsRequest = () => {return {type : ADMIN_FETCH_PRODUCTS_REQUEST}}
const fetchProductsSuccess = (payload) => { return {type : ADMIN_FETCH_PRODUCTS_SUCCESS , payload}}
const fetchProductsFailure = (payload) => {return {type : ADMIN_FETCH_PRODUCTS_FAILURE , payload}}

const fetchOneProductRequest = () => {return {type : ADMIN_FETCH_ONE_PRODUCT_REQUEST}}
const fetchOneProductSuccess = (payload=null) => { return {type : ADMIN_FETCH_ONE_PRODUCT_SUCCESS , payload}}
const fetchOneProductFailure = (payload) => {return {type : ADMIN_FETCH_ONE_PRODUCT_FAILURE , payload}}

const insertProductRequest = () => {return {type : ADMIN_INSERT_ONE_PRODUCT_REQUEST}}
const insertProductSuccess = () => { return {type : ADMIN_INSERT_ONE_PRODUCT_SUCCESS}}
const insertProductFailure = (payload) => {return {type : ADMIN_INSERT_ONE_PRODUCT_FAILURE , payload}}

const fetchBrandsRequest = () => {return {type : ADMIN_FETCH_BRANDS_REQUEST}}
const fetchBrandsSuccess = (payload) => { return {type : ADMIN_FETCH_BRANDS_SUCCESS , payload}}
const fetchBrandsFailure = (payload) => {return {type : ADMIN_FETCH_BRANDS_FAILURE , payload}}

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
const fetchCategoriesSuccess = (payload) => { return {type : ADMIN_FETCH_CATEGORIES_SUCCESS , payload}}
const fetchCategoriesFailure = (payload) => {return {type : ADMIN_FETCH_CATEGORIES_FAILURE , payload}}


const token = new Cookies().get("userToken");


export const insertProduct = ({categoryId ,barcode, brandId , product_title , product_description , productImage}) => dispatch => {
    dispatch(insertProductRequest())
    axios.post(`https://market-api.iran.liara.run/api/admin/products` ,{
        title : product_title,
        barcode,
        description : product_description,
        brand_id : brandId,
        category_id : categoryId,
        File : productImage,
    } , {headers : {'content-type' : 'multipart/form-data' ,authorization : `Bearer ${token}`,}})
    .then(() => {
        if(window){
            window.location.href="/admin/manage-products"
        }
    })
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطای سرور در بخش ثبت کالا")
        dispatch(insertProductFailure("خطای سرور در بخش ثبت کالا"))
    })
}


export const editProductAction = ({categoryId ,barcode, brandId , product_title , product_description , productImage , id}) => dispatch => {
    dispatch(fetchOneProductRequest())
    axios.post(`https://market-api.iran.liara.run/api/admin/products/${id}/update` ,{
        title : product_title,
        barcode,
        description : product_description,
        brand_id : brandId,
        category_id : categoryId,
        product_image : productImage,
    } , {headers : {'content-type' : 'multipart/form-data' ,authorization : `Bearer ${token}`,}})
    .then(() => {
        if(window){
            window.location.href="/admin/manage-products"
        }
    })
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطای سرور در بخش ویرایش اطلاعات کالا")
        dispatch(fetchOneProductFailure("خطای سرور در بخش ویرایش اطلاعات کالا"))
    })
}

export const fetchSub1 = (id) => dispatch => {
    dispatch(fetchSub1Request())
    axios.get(`https://market-api.iran.liara.run/api/admin/categories/list/${id}` , {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) => dispatch(fetchSub1Success(data.categories)))
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطای سرور در بخش گرفتن لیست زیردسته اول")
        dispatch(fetchSub1Failure("خطای سرور در بخش گرفتن لیست زیردسته اول"))
    })
} 

export const fetchSub2 = (id) => dispatch => {
    dispatch(fetchSub2Request())
    axios.get(`https://market-api.iran.liara.run/api/admin/categories/list/${id}` , {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) => dispatch(fetchSub2Success(data.categories)))
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطای سرور در بخش گرفتن لیست زیردسته دوم")
        dispatch(fetchSub2Failure("خطای سرور در بخش گرفتن لیست زیردسته دوم"))
    })
} 

export const fetchSub3 = (id) => dispatch => {
    dispatch(fetchSub3Request())
    axios.get(`https://market-api.iran.liara.run/api/admin/categories/list/${id}` , {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) => dispatch(fetchSub3Success(data.categories)))
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطای سرور در بخش گرفتن لیست زیردسته سوم")
        dispatch(fetchSub3Failure("خطای سرور در بخش گرفتن لیست زیردسته سوم"))
    })
} 

export const fetchProducts = ({state, page, limit,order, paramsBrand,barcode, paramsCategory, name}) => dispatch => {
    dispatch(fetchProductsRequest())
    axios.get(encodeURI(`https://market-api.iran.liara.run/api/admin/products?state=${state || "all"}&order=${order || "desc"}&title=${name || ""}&barcode=${barcode || ""}&category_id=${paramsCategory || ""}&brand_id=${paramsBrand ||""}&page=${page || 1}&limit=${limit || 12}`) , {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) => dispatch(fetchProductsSuccess(data)))
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطای سرور در بخش گرفتن لیست کالاها")
        dispatch(fetchProductsFailure("خطای سرور در بخش گرفتن لیست کالاها"))
    })
}
export const fetchProduct = (id) => dispatch => {
    dispatch(fetchOneProductRequest())
    axios.get(`https://market-api.iran.liara.run/api/admin/products?id=${id}` , {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) => dispatch(fetchOneProductSuccess(data.product)))
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطای سرور در بخش گرفتن اطلاعات کالا")
        dispatch(fetchOneProductFailure("خطای سرور در بخش گرفتن اطلاعات کالا"))
    })
} 
export const deleteProduct = ({id}) => dispatch => {
    dispatch(fetchOneProductRequest())
    axios.put(`https://market-api.iran.liara.run/api/admin/products/${id}/state` ,{}, {headers : {authorization : `Bearer ${token}`}})
    .then(() =>  dispatch(fetchProduct(id)))
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطای سرور در بخش حذف کالا")
        dispatch(fetchOneProductFailure("خطای سرور در بخش حذف کالا"))
    })
}
export const fetchCategories = () => dispatch => {
    dispatch(fetchCategoriesRequest())
    axios.get(`https://market-api.iran.liara.run/api/admin/categories?list=1` , {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) => dispatch(fetchCategoriesSuccess(data)))
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطای سرور در بخش گرفتن لیست دسته‌بندی ها")
        dispatch(fetchCategoriesFailure("خطای سرور در بخش گرفتن لیست دسته‌بندی ها"))
    })
}
export const fetchMainCategories = () => dispatch => {
    dispatch(fetchCategoriesRequest())
    axios.get(`https://market-api.iran.liara.run/api/admin/categories/list` , {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) => dispatch(fetchCategoriesSuccess(data)))
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطای سرور در بخش گرفتن لیست دسته‌بندی های اصلی")
        dispatch(fetchCategoriesFailure("خطای سرور در بخش گرفتن لیست دسته‌بندی های اصلی"))
    })
}
export const fetchBrands = () => dispatch => {
    dispatch(fetchBrandsRequest())
    axios.get(`https://market-api.iran.liara.run/api/admin/brands?list=1` , {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) => dispatch(fetchBrandsSuccess(data)))
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطای سرور در بخش گرفتن لیست برندها")
        dispatch(fetchBrandsFailure("خطای سرور در بخش گرفتن لیست برندها"))
    })
}

