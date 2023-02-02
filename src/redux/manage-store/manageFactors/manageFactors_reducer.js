import {
     STORE_FETCH_FACTORES_REQUEST,
     STORE_FETCH_FACTORES_SUCCESS,
     STORE_FETCH_FACTORES_FAILURE,

     STORE_FETCH_INVOICE_ITEMS_REQUEST,
     STORE_FETCH_INVOICE_ITEMS_SUCCESS,
     STORE_FETCH_INVOICE_ITEMS_FAILURE,
     STORE_ACTION_LOADING_REQUEST,
     STORE_ACTION_LOADING_SUCCESS,
     STORE_ACTION_LOADING_FAILURE,
} from './manageFactors_types'

const initialValues = {
     factors : null , 
     error : false , 
     loading : false,
     actionLoading : [],
};

export const store_factorReducer = (state = initialValues , action) => {
     switch (action.type) {
          case STORE_FETCH_FACTORES_REQUEST : {return {...state , factors : state.factors , error : false , loading : true};}
          case STORE_FETCH_FACTORES_SUCCESS : {return {...state , factors : action.payload , error : false , loading : false};}
          case STORE_FETCH_FACTORES_FAILURE : {return {...state , factors : state.factors , error : action.payload , loading : false};}

          // Loading Actions
          case STORE_ACTION_LOADING_REQUEST : { 
               return {
                    ...state , 
                    actionLoading : [...state.actionLoading ,action.payload]
               }
          }
          case STORE_ACTION_LOADING_SUCCESS : { 
               const loadingList = state.actionLoading.filter(state => state !==  action.payload)
               return {...state , actionLoading : loadingList}
          }
          case STORE_ACTION_LOADING_FAILURE : { 
               const loadingList = state.actionLoading.filter(state => state !==  action.payload)
               return {...state , actionLoading : loadingList}
          }
          
          default : return state
     }
}