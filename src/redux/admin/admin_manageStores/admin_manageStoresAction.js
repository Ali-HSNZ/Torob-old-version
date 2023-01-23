import http, { requestError, requestSuccess, token } from "src/services/http";

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

const insertStoreRequest = () => {return {type : ADMIN_INSERT_STORE_REQUEST}}
const insertStoreSuccess = (payload) => {return {type : ADMIN_INSERT_STORE_SUCCESS , payload}}
const insertStoreFailure = (payload) => {return {type : ADMIN_INSERT_STORE_FAILURE , payload}}

const fetchStoreRequest = () => {return {type : ADMIN_FETCH_STORE_REQUEST}}
const fetchStoreSuccess = (payload) => {return {type : ADMIN_FETCH_STORE_SUCCESS , payload}}
const fetchStoreFailure = (payload) => {return {type : ADMIN_FETCH_STORE_FAILURE , payload}}

const fetchOneStoreRequest = () => {return {type : ADMIN_FETCH_ONE_STORE_REQUEST}}
export const fetchOneStoreSuccess = (payload) => {return {type : ADMIN_FETCH_ONE_STORE_SUCCESS , payload}}
export const fetchOneStoreFailure = (payload) => {return {type : ADMIN_FETCH_ONE_STORE_FAILURE , payload}}

export const fetchStores = ({state,page,limit,order,economic_code,number,name,province,city}) => dispatch => {
     dispatch(fetchStoreRequest())
     http.get(encodeURI(`admin/stores?state=${state || "all"}&province=${province || ""}&city=${city || ""}&name=${name || ""}&number=${number || ""}&order=${order || "desc"}&economic_code=${economic_code || ""}&page=${page || 1}&limit=${limit || 12}`) , {headers : {authorization : token}})
     .then(({data}) => dispatch(fetchStoreSuccess(data)))
     .catch(error => {
          requestError({error : error?.response?.data?.errors, defaultMessage : "خطای سرور در بخش گرفتن لیست فروشگاه‌ها"})
          dispatch(fetchStoreFailure("خطای سرور در بخش گرفتن لیست فروشگاه‌ها"))
     })
}
// Used in SSR
export const fetchOneStore = (storeId) => dispatch => {
    dispatch(fetchOneStoreRequest())
    http.get(encodeURI(`admin/stores?id=${storeId}`) , {headers : {authorization : token}})
    .then(({data}) => dispatch(fetchOneStoreSuccess(data.store)))
    .catch(error => {
        requestError({error : error?.response?.data?.errors, defaultMessage : "خطای سرور در بخش گرفتن اطلاعات یک فروشگاه"})
        dispatch(fetchOneStoreFailure("خطای سرور در بخش گرفتن اطلاعات یک فروشگاه"))
    })
}
export const deleteStore = (storeId) => dispatch => {
     dispatch(fetchOneStoreRequest())
     http.put(`admin/stores/${storeId}/state` ,{}, {headers : {authorization : token}})
     .then(({data}) => dispatch(fetchOneStoreSuccess(data.store)))
     .catch(error => {
          requestError({error : error?.response?.data?.errors, defaultMessage : "خطای سرور در بخش حذف فروشگاه"})
          dispatch(fetchOneStoreFailure("خطای سرور در بخش حذف فروشگاه"))
     })
}
export const confirmStore = (storeId) => dispatch => {
     dispatch(fetchOneStoreRequest())
     http.put(`admin/stores/${storeId}/confirm` ,{}, {headers : {authorization : token}})
     .then(({data}) => {
          requestSuccess("فروشگاه با موفقیت تایید شد")
          dispatch(fetchOneStoreSuccess(data.store))
     })
     .catch(error => {
          requestError({error : error?.response?.data?.errors, defaultMessage : "خطای سرور در بخش تایید فروشگاه"})
          dispatch(fetchOneStoreFailure("خطای سرور در بخش تایید فروشگاه"))
     })
}

export const insertStore = ({values,onChangeFile_logo,onChangeFile_license,onChangeFile_storeBanner,city,province}) => dispatch => {
    const logo_image = onChangeFile_logo.selectedFile ? onChangeFile_logo.selectedFile : onChangeFile_logo.imageUrl ? 0 : 1;
    const banner_image = onChangeFile_storeBanner.selectedFile ? onChangeFile_storeBanner.selectedFile : onChangeFile_storeBanner.imageUrl ? 0 : 1;
    const license_image = onChangeFile_license.selectedFile ? onChangeFile_license.selectedFile : onChangeFile_license.imageUrl ? 0 : 1;

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
        bank_card_number,
        office_number,
        warehouse_number,
    } = values
    dispatch(insertStoreRequest())
    http.post(`admin/stores` ,{
        name ,
        economic_code ,
        owner_full_name ,
        owner_phone_number ,
        secend_phone_number ,
        office_address ,
        office_number : office_number.replace(/["'()]/g,"").replace(/\s/g, '').replace(/-/g, ''),
        warehouse_address ,
        warehouse_number : warehouse_number.replace(/["'()]/g,"").replace(/\s/g, '').replace(/-/g, ''),
        bank_name ,
        bank_code ,
        bank_card_number : bank_card_number.replace(/\s/g, '').replace(/-/g, ''),
        bank_sheba_number,
        province,
        owner_national_code,
        city,
        license_image,
        banner_image,
        logo_image,
    } , {headers : {'content-type' : 'multipart/form-data' ,authorization : token}})
    .then(() => { if(window){ window.location.href="/admin/manage-stores"} })
    .catch(error => {
        requestError({error : error?.response?.data?.errors, defaultMessage : "خطا در ثبت فروشگاه"})
        dispatch(insertStoreFailure("خطا در ثبت فروشگاه"))
    })
}


export const updateStore = ({storeId,values,onChangeFile_logo,onChangeFile_license,onChangeFile_storeBanner,city,province}) => dispatch => {
     const logo_image = onChangeFile_logo.selectedFile ? onChangeFile_logo.selectedFile : onChangeFile_logo.imageUrl ? 0 : 1;
     const banner_image = onChangeFile_storeBanner.selectedFile ? onChangeFile_storeBanner.selectedFile : onChangeFile_storeBanner.imageUrl ? 0 : 1;
     const license_image = onChangeFile_license.selectedFile ? onChangeFile_license.selectedFile : onChangeFile_license.imageUrl ? 0 : 1;
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
          office_number,
          warehouse_number,
          bank_card_number,
          owner_password,
     } = values
     dispatch(fetchOneStoreRequest())
     http.post(`admin/stores/${storeId}/update` ,{
          name ,
          economic_code ,
          owner_full_name ,
          owner_phone_number ,
          secend_phone_number ,
          owner_national_code,
          office_address ,
          office_number : office_number.replace(/["'()]/g,"").replace(/\s/g, '').replace(/-/g, ''),
          warehouse_address ,
          warehouse_number : warehouse_number.replace(/["'()]/g,"").replace(/\s/g, '').replace(/-/g, ''),
          bank_name ,
          bank_code ,
          bank_card_number : bank_card_number.replace(/\s/g, '').replace(/-/g, ''),
          bank_sheba_number,
          owner_password,
          province :province,
          city,
          license_image,
          banner_image,
          logo_image,
     } , {headers : {'content-type' : 'multipart/form-data' , authorization : token}})
     .then(() => { if(window){ window.location.href="/admin/manage-stores" } })
     .catch(error => {
          requestError({error : error?.response?.data.errors, defaultMessage : "خطا در ثبت تغییرات"})
          dispatch(fetchOneStoreFailure("خطا در ثبت تغییرات"))
     })
}