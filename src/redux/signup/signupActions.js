import axios from "axios"
import toast from "react-hot-toast";
import Cookies from "universal-cookie";
import { 
    SIGNUP_FAILURE, 
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS 
} from "./signupTypes";

const token = new Cookies().get("userToken");

const signupRequest = () => {
    return {type : SIGNUP_REQUEST}
}
const signupSuccess = (payload) => {
    return {type : SIGNUP_SUCCESS , payload}
}
const signupFailure = (payload) => {
    return {type : SIGNUP_FAILURE , payload}
}
 export const signupAction = ({values,profileImage,city,province,house_number}) => async dispatch => {
    const {
        full_name ,
        national_code ,
        phone_number_primary , 
        phone_number_secondary,
        address_detail,
        address_postcode,
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