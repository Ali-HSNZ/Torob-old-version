import { 
    ADMIN_INSERT_STORE_REQUEST,
    ADMIN_INSERT_STORE_SUCCESS, 
    ADMIN_INSERT_STORE_FAILURE, 

    ADMIN_FETCH_STORE_REQUEST,
    ADMIN_FETCH_STORE_SUCCESS, 
    ADMIN_FETCH_STORE_FAILURE, 

    ADMIN_FETCH_ONE_STORE_REQUEST,
    ADMIN_FETCH_ONE_STORE_SUCCESS, 
    ADMIN_FETCH_ONE_STORE_FAILURE, 
} from './admin_manageStoresTypes' 

const initialValues = {stores : null , loading : false , error : null, oneStore : { store : null , error : null}}
export const admin_storesReducer = (state=initialValues,action) => {
     switch (action.type) {
          // Insert Store State =>
          case ADMIN_INSERT_STORE_REQUEST : {return {...state,stores : null , loading : true , error : null}}
          case ADMIN_INSERT_STORE_SUCCESS:{return {...state,stores : action.payload , loading : false , error : null}}
          case ADMIN_INSERT_STORE_FAILURE:{return {...state,stores : state.stores , loading : false , error : action.payload}}

          // Fetch Store State =>
          case ADMIN_FETCH_STORE_REQUEST:{return {...state,stores : null , loading : true , error : null}}
          case ADMIN_FETCH_STORE_SUCCESS:{return {
               ...state,
               stores : action.payload && action.payload.stores.length > 0 ? action.payload.stores : null,
               pagination : action.payload.pagination,
               error : null , 
               loading : false,
          }}
          case ADMIN_FETCH_STORE_FAILURE:{return {...state,stores : null , loading : false , error : action.payload}}
          
          // Fetch One Store State =>
          case ADMIN_FETCH_ONE_STORE_REQUEST:{return {...state , loading : true, oneStore : { store : state.oneStore.store , error : null}}}
          case ADMIN_FETCH_ONE_STORE_SUCCESS:{return {...state , loading : false, oneStore : { store : action.payload , error : null}}}
          case ADMIN_FETCH_ONE_STORE_FAILURE:{return  {...state , loading : false, oneStore : { store : state.oneStore.store , error : action.payload}}}
     
          default: return state
     }
}