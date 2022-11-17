import axios from "axios"
import toast from "react-hot-toast"
import Cookies from "universal-cookie"

const { 
    ADMIN_INSERT_STORE_REQUEST, 
    ADMIN_INSERT_STORE_SUCCESS, 
    ADMIN_INSERT_STORE_FAILURE,

    ADMIN_FETCH_STORE_REQUEST, 
    ADMIN_FETCH_STORE_SUCCESS, 
    ADMIN_FETCH_STORE_FAILURE,

    ADMIN_FETCH_ONE_STORE_REQUEST, 
    ADMIN_FETCH_ONE_STORE_SUCCESS, 
    ADMIN_FETCH_ONE_STORE_FAILURE,
} = require("./admin_manageStoresTypes")


const insertStoreRequest = () => {
    return {type : ADMIN_INSERT_STORE_REQUEST}
}
const insertStoreSuccess = (payload) => {
    return {type : ADMIN_INSERT_STORE_SUCCESS , payload}
}
const insertStoreFailure = (payload) => {
    return {type : ADMIN_INSERT_STORE_FAILURE , payload}
}

const fetchStoreRequest = () => {
    return {type : ADMIN_FETCH_STORE_REQUEST}
}
const fetchStoreSuccess = (payload) => {
    return {type : ADMIN_FETCH_STORE_SUCCESS , payload}
}
const fetchStoreFailure = (payload) => {
    return {type : ADMIN_FETCH_STORE_FAILURE , payload}
}

const fetchOneStoreRequest = () => {
    return {type : ADMIN_FETCH_ONE_STORE_REQUEST}
}
const fetchOneStoreSuccess = (payload) => {
    return {type : ADMIN_FETCH_ONE_STORE_SUCCESS , payload}
}
const fetchOneStoreFailure = (payload) => {
    return {type : ADMIN_FETCH_ONE_STORE_FAILURE , payload}
}

const token = new Cookies().get("userToken");

export const fetchStores = ({state,page,limit,order,economic_code,number,name,province,city}) => dispatch => {
    dispatch(fetchStoreRequest())
    axios.get(encodeURI(`https://market-api.iran.liara.run/api/admin/stores?state=${state || "all"}&province=${province || ""}&city=${city || ""}&name=${name || ""}&number=${number || ""}&order=${order || "desc"}&economic_code=${economic_code || ""}&page=${page || 1}&limit=${limit || 12}`) , {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) => dispatch(fetchStoreSuccess(data)))
    .catch(error => {
        const message = error?.response?.data?.message || "خطای سرور در بخش گرفتن لیست فروشگاه‌ها";
        dispatch(fetchStoreFailure(message))
        toast.error(message)
    })
}
export const fetchOneStore = (id) => dispatch => {
    dispatch(fetchOneStoreRequest())
    axios.get(encodeURI(`https://market-api.iran.liara.run/api/admin/stores?id=${id}`) , {headers : {authorization : `Bearer ${token}`}})
    .then(({data}) => {dispatch(fetchOneStoreSuccess(data.store))})
    .catch(error => {
        const message = error?.response?.data?.message || "خطای سرور در بخش گرفتن اطلاعات یک فروشگاه";
        dispatch(fetchOneStoreFailure(message))
        toast.error(message)
    })
}

export const deleteStore = (pageId) => dispatch => {
    dispatch(fetchOneStoreRequest())
    axios.put(`https://market-api.iran.liara.run/api/admin/stores/${pageId}/state` ,{}, {headers : {authorization : `Bearer ${token}`}})
    .then(() =>  dispatch(fetchOneStore(pageId)))
    .catch(error => {
        const errorMessage = error?.response?.data?.message || "خطای سرور در بخش  تغییر وضعیت فروشگاه";
        toast.error(errorMessage)
        dispatch(fetchOneStoreFailure(errorMessage))
    })
}



export const insertStore = ({values,logo,license,storeBanner,city,province,bankCardNumber,staticWarehouseNumber,staticOfficeNumber}) => dispatch => {
    
    const {
        name,
        economic_code,
        owner_full_name,
        owner_phone_number,
        secend_phone_number,
        office_address,
        warehouse_address,
        bank_name,
        bank_code,
        bank_sheba_number,
        owner_national_code,
    } = values
    dispatch(insertStoreRequest())
    axios.post(`https://market-api.iran.liara.run/api/admin/stores` ,{
        name ,
        economic_code ,
        owner_full_name ,
        owner_phone_number ,
        secend_phone_number ,
        office_address ,
        office_number : staticOfficeNumber,
        warehouse_address ,
        warehouse_number : staticWarehouseNumber,
        bank_name ,
        bank_code ,
        bank_card_number : bankCardNumber,
        bank_sheba_number,
        province,
        owner_national_code,
        city,
        license_image : license,
        banner_image : storeBanner,
        logo_image : logo,
    } , {headers : {'content-type' : 'multipart/form-data' ,authorization : `Bearer ${token}`,}})
    .then(() => {
        toast.success('فروشگاه با موفقیت ثبت شد')
        dispatch(insertStoreSuccess())
    } )
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطا در ثبت فروشگاه")
        dispatch(insertStoreFailure("خطا در ثبت فروشگاه"))
    })
}

export const updateStore = ({pageId : id,values,logo,license,storeBanner,city,province,bankCardNumber,staticWarehouseNumber,staticOfficeNumber}) => dispatch => {
    dispatch(fetchOneStoreRequest())
    const {
        name,
        economic_code,
        owner_full_name,
        owner_phone_number,
        secend_phone_number,
        office_address,
        owner_national_code,
        warehouse_address,
        bank_name,
        bank_code,
        bank_sheba_number,
    } = values
    dispatch(insertStoreRequest())
    axios.post(`https://market-api.iran.liara.run/api/admin/stores/${id}/update` ,{
        name ,
        economic_code ,
        owner_full_name ,
        owner_phone_number ,
        secend_phone_number ,
        owner_national_code,
        office_address ,
        office_number : staticOfficeNumber,
        warehouse_address ,
        warehouse_number : staticWarehouseNumber,
        bank_name ,
        bank_code ,
        bank_card_number : bankCardNumber,
        bank_sheba_number,
        province :province,
        city,
        license_image : license || 0,
        banner_image : storeBanner || 0,
        logo_image : logo || 0
    } , {headers : {'content-type' : 'multipart/form-data' ,authorization : `Bearer ${token}`,}})
    .then(() => {
        toast.success('تغییرات با موفقیت ثبت شد')
        dispatch(fetchOneStore(id))
    } )
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطا در ثبت تغییرات")
        dispatch(fetchOneStoreFailure("خطا در ثبت تغییرات"))
    })
}