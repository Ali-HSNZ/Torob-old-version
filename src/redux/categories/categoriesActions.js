// SSR Fetching
import { 
     FETCH_CATEGORIES_REQUEST, 
     FETCH_CATEGORIES_SUCCESS, 
     FETCH_CATEGORIES_FAILURE 
} from "./categoriesTypes"

export const fetchCategoriesRequest = () => { return {type : FETCH_CATEGORIES_REQUEST}}
export const fetchCategoriesSuccess = (payload) => {return {type : FETCH_CATEGORIES_SUCCESS , payload}}
export const fetchCategoriesFailure = (payload) => {return {type : FETCH_CATEGORIES_FAILURE , payload}}