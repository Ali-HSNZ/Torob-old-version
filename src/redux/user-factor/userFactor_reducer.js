import { 
     USER_FETCH_INVOICES_REQUEST, 
     USER_FETCH_INVOICES_SUCCESS,
     USER_FETCH_INVOICES_FAILURE, 

     USER_ACTION_LOADING_REQUEST,
     USER_ACTION_LOADING_SUCCESS,
     USER_ACTION_LOADING_FAILURE,
} from "./userFactor_types";


const initialValues = {
     factors : null , 
     error : false , 
     loading : false,
     actionLoading : [],
};

export const user_factorReducer = (state = initialValues , action) => {
     switch (action.type) {
          case USER_FETCH_INVOICES_REQUEST : {return {...state , factors : state.factors , error : false , loading : true};}
          case USER_FETCH_INVOICES_SUCCESS : {return {...state , factors : action.payload , error : false , loading : false};}
          case USER_FETCH_INVOICES_FAILURE : {return {...state , factors : state.factors , error : action.payload , loading : false};}


          // Loading Actions
          case USER_ACTION_LOADING_REQUEST : { 
               return {
                    ...state , 
                    actionLoading : [...state.actionLoading ,action.payload]
               }
          }
          case USER_ACTION_LOADING_SUCCESS : { 
               const loadingList = state.actionLoading.filter(state => state !==  action.payload)
               return {...state , actionLoading : loadingList}
          }
          case USER_ACTION_LOADING_FAILURE : { 
               const loadingList = state.actionLoading.filter(state => state !==  action.payload)
               return {...state , actionLoading : loadingList}
          }
          
          default : return state
     }
}