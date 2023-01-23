import { 
     // Loading
     ADD_OR_REMOVE_PRODUCT_IN_LIKES_LOADING_FAILURE,
     ADD_OR_REMOVE_PRODUCT_IN_LIKES_LOADING_REQUEST,
     ADD_OR_REMOVE_PRODUCT_IN_LIKES_LOADING_SUCCESS,
     
     FETCH_LIKES_FAILURE,
     FETCH_LIKES_REQUEST, 
     FETCH_LIKES_SUCCESS,
} from "./likeTypes";

const initailState = {likes : [] , error : null , loading : false , likesLoading : []}
export const likesReducer = (state = initailState , action) => {   
     switch (action.type) {
          case FETCH_LIKES_REQUEST : {return {...state , likes : [],error : null,loading : true}}
          case FETCH_LIKES_SUCCESS : {return {...state , likes : action.payload ,error : null ,loading : false}}
          case FETCH_LIKES_FAILURE : {return {...state , likes : [] , error : action.payload , loading : false}}
          
          // Loading Actions
          case ADD_OR_REMOVE_PRODUCT_IN_LIKES_LOADING_REQUEST : { 
               return {
                    ...state , 
                    likesLoading : [...state.likesLoading ,{product_id : action.payload}]
               }
          }
          case ADD_OR_REMOVE_PRODUCT_IN_LIKES_LOADING_SUCCESS : { 
               const loadingList = state.likesLoading.filter(product => product.product_id !==  action.payload)
               return {...state , likesLoading : loadingList}
          }
          case ADD_OR_REMOVE_PRODUCT_IN_LIKES_LOADING_FAILURE : { 
               const loadingList = state.likesLoading.filter(product => product.product_id !==  action.payload)
               return {...state , likesLoading : loadingList}
          }

          default: return state
     }
}