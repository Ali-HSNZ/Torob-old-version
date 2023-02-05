import { toast } from "react-toastify";
import http, { requestError, requestSuccess, token } from "src/services/http";
import { 
     CHANGE_MIN_SHOPPING_COUNT_REQUEST, 
     CHANGE_MIN_SHOPPING_COUNT_SUCCESS ,
     CHANGE_MIN_SHOPPING_COUNT_FAILURE, 
} from "./storeSettings_types";

const changeMinShoppingCount_request = () => {
     return {type : CHANGE_MIN_SHOPPING_COUNT_REQUEST}
}
const changeMinShoppingCount_success = (payload) => {
     return {type : CHANGE_MIN_SHOPPING_COUNT_SUCCESS , payload}
}
const changeMinShoppingCount_failure = (payload) => {
     return {type : CHANGE_MIN_SHOPPING_COUNT_FAILURE , payload}
}

export const changeMinShoppingCount = ({min_shopping_count}) => dispatch => {
     dispatch(changeMinShoppingCount_request())
     http.post(`store/setting` , {min_shopping_count} , {headers : {authorization : token}})
     .then(({data}) => {
        toast.success("تغییرات با موفقیت ثبت شد")
        dispatch(changeMinShoppingCount_success(data))
    })
     .catch(error => {
          requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن تعداد کالا ها"})
          dispatch(changeMinShoppingCount_failure("خطای سرور در بخش گرفتن تعداد کالا ها"))
     })
}