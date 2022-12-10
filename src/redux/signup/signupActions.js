import axios from "axios"
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { authPanel } from "../user/userActions";
import { 
    SIGNUP_FAILURE, 
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
} from "./signupTypes";

const token = new Cookies().get("userToken");

const signupRequest = () => {
    return {type : SIGNUP_REQUEST}
}
const signupSuccess = () => {
    return {type : SIGNUP_SUCCESS}
}
const signupFailure = (payload) => {
    return {type : SIGNUP_FAILURE , payload}
}


export const signupUserAction = ({values,profileImage,city,province}) => async dispatch => {
    const {
        full_name ,
        national_code ,
        phone_number_primary , 
        phone_number_secondary,
        address_detail,
        address_postcode,
        password,
        house_number,
    } = values

    dispatch(signupRequest())

    await axios.post(`https://market-api.iran.liara.run/api/signup/user` ,{
        full_name ,
        national_code ,
        phone_number_primary , 
        phone_number_secondary,
        address_detail,
        address_postcode,
        house_number,
        password,
        profile_image : profileImage,
        address_city : city,
        address_province : province,
    } , {headers : {'content-type' : 'multipart/form-data'}})
    .then(({data}) => {
        new Cookies().set('userToken' ,data.API_TOKEN,{path:'/'} )
        toast.success("حساب کاربری با موفقیت ایجاد شد")
        setTimeout(() => {
            if(window){
                window.location.href="/"
            }
        }, 1200);
    })
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطا در ثبت کاربر")
        dispatch(signupFailure("خطا در ثبت کاربر"))
    })
}

export const insertStoreAction = ({values,onChangeFile_logo,onChangeFile_license,onChangeFile_storeBanner,city,province}) => async dispatch => {
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
        owner_password,
    } = values
    dispatch(signupRequest())
    await axios.post(`https://market-api.iran.liara.run/api/signup/store` ,{
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
        owner_password,
    } , {headers : {'content-type' : 'multipart/form-data'}})
    .then(({data}) => {
        new Cookies().set('userToken' ,data.API_TOKEN,{path:'/'} )
        toast.success("فروشگاه با موفقیت ایجاد شد")
        setTimeout(() => {
            if(window){
                window.location.href="/"
            }
        }, 1200);
    })
    .catch(error => {
        const serverMessage_list = error?.response?.data?.errors
        if(serverMessage_list && serverMessage_list.length > 0) serverMessage_list.forEach(error => toast.error(error));
        if(!serverMessage_list) toast.error("خطا در ثبت فروشگاه")
        dispatch(signupFailure("خطا در ثبت فروشگاه"))
    })
}