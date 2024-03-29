import { 
    ADMIN_FETCH_BRANDS_REQUEST, 
    ADMIN_FETCH_BRANDS_SUCCESS,
    ADMIN_FETCH_BRANDS_FAILURE, 
} from "./admin_manageBrandTypes";

const initailState = {brands : null , error : null , loading : false}

export const admin_brandsReducer = (state = initailState , action) => {
     switch (action.type) {
          case ADMIN_FETCH_BRANDS_REQUEST: { return {brands : null , error : null , loading : true}}
          case ADMIN_FETCH_BRANDS_SUCCESS:{ 
               return {
                    brands : action.payload.brands.length === 0 ? null : action.payload.brands,
                    pagination : action.payload.pagination,
                    error : null , 
                    loading : false,
               }
          }
          case ADMIN_FETCH_BRANDS_FAILURE : {return {brands : null , error : action.payload , loading : false}}
          
          default: return state
     }
}