import { 
    FETCH_HOME_DATA_REQUEST, 
    FETCH_HOME_DATA_SUCCESS, 
    FETCH_HOME_DATA_FAILURE 
} from "./home_types";

export const home_fetchDataRequest = () => {
    return {type : FETCH_HOME_DATA_REQUEST}
}
export const home_fetchDataSuccess = payload => {
    return {type : FETCH_HOME_DATA_SUCCESS , payload}
}
export const home_fetchDataFailure = payload => {
    return {type : FETCH_HOME_DATA_FAILURE , payload}
}

