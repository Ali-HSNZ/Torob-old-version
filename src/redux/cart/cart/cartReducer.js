const { 
    CART_ADD_TO_CART_REQUEST, 
    CART_ADD_TO_CART_SUCCESS, 
    CART_ADD_TO_CART_FAILURE,

    FETCH_MAIN_CART_REQUEST,
    FETCH_MAIN_CART_SUCCESS,
    FETCH_MAIN_CART_FAILURE,

    // Loading Types => 
    CART_ADD_TO_CART_LOADING_REQUEST,
    CART_ADD_TO_CART_LOADING_SUCCESS,
    CART_ADD_TO_CART_LOADING_FAILURE,

    // Loading Types => 
    CART_INCREASE_OR_DECREASE_PRODUCT_LOADING_REQUEST,
    CART_INCREASE_OR_DECREASE_PRODUCT_LOADING_SUCCESS,
    CART_INCREASE_OR_DECREASE_PRODUCT_LOADING_FAILURE,
} = require("./cartTypes")

const initialState = {
     // List Of Store Id And Product Id In Cart => [{store_Id : ? , product_Id : ? , count : ?} , ...]
     cart : {data : null , error : null , loading : false},  
     cart_count : 0,
     // List Of Store  => [{StoreTitle : ? , products : []} , ... ]
     mainCartPage : {data : null , error : null , loading : false},
     addToCartLoading : [],
     increaseOrDecreaseProductCartLoading : [],
}

export const cartReducer = (state = initialState , action) => {
    switch (action.type) {
          // Add To Cart State 
          case CART_ADD_TO_CART_REQUEST : { return {...state , cart : {data : state.cart.data , error : null , loading : true } , cart_count : state.cart_count}}
          case CART_ADD_TO_CART_SUCCESS : { return {...state , cart : {data : action.payload.cart , error : null , loading : false}  ,cart_count : action.payload.cart_count}}
          case CART_ADD_TO_CART_FAILURE : { return {...state , cart : {data : state.cart.data , error : null , loading : true } , cart_count : state.cart_count}}

          // State Loading For Adding Product To Cart 
          case CART_ADD_TO_CART_LOADING_REQUEST : { return {...state , addToCartLoading : [...state.addToCartLoading ,{store_id : action.store_id}]}}
          case CART_ADD_TO_CART_LOADING_SUCCESS : { 
               const loadingList = state.addToCartLoading.filter(store => store.store_id !== action.store_id)
               return {...state , addToCartLoading : loadingList}
          }
          case CART_ADD_TO_CART_LOADING_FAILURE : { 
               const loadingList = state.addToCartLoading.filter(store => store.store_id !== action.store_id)
               return {...state , addToCartLoading : loadingList}
          }

          // State Loading For increase Product in Cart 
          case CART_INCREASE_OR_DECREASE_PRODUCT_LOADING_REQUEST : { 
               return {
                    ...state , 
                    increaseOrDecreaseProductCartLoading : [...state.increaseOrDecreaseProductCartLoading ,{store_id : action.store_id}]
               }
          }
          case CART_INCREASE_OR_DECREASE_PRODUCT_LOADING_SUCCESS : { 
               const loadingList = state.increaseOrDecreaseProductCartLoading.filter(store => store.store_id !== action.store_id)
               return {...state , increaseOrDecreaseProductCartLoading : loadingList}
          }
          case CART_INCREASE_OR_DECREASE_PRODUCT_LOADING_FAILURE : { 
               const loadingList = state.increaseOrDecreaseProductCartLoading.filter(store => store.store_id !== action.store_id)
               return {...state , increaseOrDecreaseProductCartLoading : loadingList}
          }
          // Fetch Main Stores Cart Request
          case FETCH_MAIN_CART_REQUEST : { return {...state , mainCartPage : {data : state.mainCartPage.data , error : null , loading : true}}}
          case FETCH_MAIN_CART_SUCCESS : { return {...state , mainCartPage : {data : action.payload , error : null , loading : false}}}
          case FETCH_MAIN_CART_FAILURE : { return {...state , mainCartPage : {data : null , error : null , loading : false}}}

          default: return state
    }
}