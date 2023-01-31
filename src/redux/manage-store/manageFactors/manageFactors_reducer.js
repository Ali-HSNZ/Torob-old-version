import {
     STORE_FETCH_FACTORES_REQUEST,
     STORE_FETCH_FACTORES_SUCCESS,
     STORE_FETCH_FACTORES_FAILURE,

     STORE_FETCH_INVOICE_ITEMS_REQUEST,
     STORE_FETCH_INVOICE_ITEMS_SUCCESS,
     STORE_FETCH_INVOICE_ITEMS_FAILURE,
} from './manageFactors_types'

const initialValues = {
     factors : null , 
     error : false , 
     loading : false,

     products : {items : null , error : null , loading  : false}
};

export const store_factorReducer = (state = initialValues , action) => {
     switch (action.type) {
          case STORE_FETCH_FACTORES_REQUEST : {return {...state , factors : state.factors , error : false , loading : true};}
          case STORE_FETCH_FACTORES_SUCCESS : {return {...state , factors : action.payload , error : false , loading : false};}
          case STORE_FETCH_FACTORES_FAILURE : {return {...state , factors : state.factors , error : action.payload , loading : false};}

          case STORE_FETCH_INVOICE_ITEMS_REQUEST : {return {...state , products : {items : null , error : null , loading  : true}};}
          case STORE_FETCH_INVOICE_ITEMS_SUCCESS : {return {...state , products : {items : action.payload , error : null , loading  : false}};}
          case STORE_FETCH_INVOICE_ITEMS_FAILURE : {return {...state , products : {items : null , error : action.payload , loading  : false}};}
          
          default : return state
     }
}