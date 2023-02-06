import { 
    CHECKOUT_MAIN_FETCH_FAILURE, 
    CHECKOUT_MAIN_FETCH_REQUEST, 
    CHECKOUT_MAIN_FETCH_SUCCESS,

    CHECKOUT_INCREASE_OR_DECREASE_PRODUCT_LOADING_REQUEST,
    CHECKOUT_INCREASE_OR_DECREASE_PRODUCT_LOADING_SUCCESS,
    CHECKOUT_INCREASE_OR_DECREASE_PRODUCT_LOADING_FAILURE,

    CHECKOUT_INCREASE_PRODUCT_FAILURE, 
    CHECKOUT_INCREASE_PRODUCT_SUCCESS, 
    CHECKOUT_INCREASE_PRODUCT_REQUEST,

    CHECKOUT_DECREASE_PRODUCT_FAILURE, 
    CHECKOUT_DECREASE_PRODUCT_SUCCESS, 
    CHECKOUT_DECREASE_PRODUCT_REQUEST,
} from "./checkoutTypes"

const initialState = {
    data : null , 
    error : null , 
    loading : null , 
    increaseOrDecreaseLoading : []
}

export const checkoutReducer = (state = initialState , action) => {
    switch (action.type) {
        case CHECKOUT_MAIN_FETCH_REQUEST : { return {...state , data : state.data , error : null , loading : true}}
        case CHECKOUT_MAIN_FETCH_SUCCESS : { return {...state , data : action.payload , error : null , loading : false}}
        case CHECKOUT_MAIN_FETCH_FAILURE : { return {...state , data : null , error : null , loading : false}}

        case CHECKOUT_INCREASE_PRODUCT_REQUEST : { return {...state , data : state.data , error : null , loading : true}}
        case CHECKOUT_INCREASE_PRODUCT_SUCCESS : { return {...state , data : action.payload , error : null , loading : false}}
        case CHECKOUT_INCREASE_PRODUCT_FAILURE : { return {...state , data : null , error : action.payload , loading : false}}
    
        case CHECKOUT_DECREASE_PRODUCT_REQUEST : { return {...state , data : state.data , error : null , loading : true}}
        case CHECKOUT_DECREASE_PRODUCT_SUCCESS : { return {...state , data : action.payload , error : null , loading : false}}
        case CHECKOUT_DECREASE_PRODUCT_FAILURE : { return {...state , data : null , error : action.payload , loading : false}}

        // State Loading For increase Or Decrease Product
        case CHECKOUT_INCREASE_OR_DECREASE_PRODUCT_LOADING_REQUEST : { return {...state , increaseOrDecreaseLoading : [...state.increaseOrDecreaseLoading ,{product_id : action.payload}]}}
        case CHECKOUT_INCREASE_OR_DECREASE_PRODUCT_LOADING_SUCCESS : { 
            const loadingList = state.increaseOrDecreaseLoading.filter(state => state.product_id !== action.payload)
            return {...state , increaseOrDecreaseLoading : loadingList}
        }
        case CHECKOUT_INCREASE_OR_DECREASE_PRODUCT_LOADING_FAILURE : { 
            const loadingList = state.increaseOrDecreaseLoading.filter(state => state.product_id !== action.payload)
            return {...state , increaseOrDecreaseLoading : loadingList}
        }
            
        default : return state
    }
}

