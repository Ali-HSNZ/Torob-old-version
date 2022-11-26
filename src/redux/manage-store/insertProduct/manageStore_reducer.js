const { 
    STORE_FETCH_PRODUCTS_BASES_FAILURE, 
    STORE_FETCH_PRODUCTS_BASES_REQUEST,
    STORE_FETCH_PRODUCTS_BASES_SUCCESS,

    STORE_FETCH_BRANDS_REQUEST,
    STORE_FETCH_BRANDS_SUCCESS,
    STORE_FETCH_BRANDS_FAILURE,

    STORE_FETCH_CATEGORIES_REQUEST,
    STORE_FETCH_CATEGORIES_SUCCESS,
    STORE_FETCH_CATEGORIES_FAILURE,

    STORE_INSERT_PRODUCT_REQUEST,
    STORE_INSERT_PRODUCT_SUCCESS,
    STORE_INSERT_PRODUCT_FAILURE,

    FETCH_STORE_COUNT_REQUEST, 
    FETCH_STORE_COUNT_SUCCESS, 
    FETCH_STORE_COUNT_FAILURE, 

} = require("./manageStore_types")

const initialState = {
    products:{ products : null,loading : false,error : null},
    categories:{categories : null,loading : false,error : null},
    brands:{brands : null,loading : false,error : null},
    mainDataCount:{data : null,loading : false,error : null},
}
export const manageStoreReducer = (state = initialState , action) => {
    switch (action.type) {
        // Fetch Store Data Count => Show in Main Panel 

        case FETCH_STORE_COUNT_REQUEST: {return {...state , mainDataCount : {data : null , loading : true , error : null}}}
        case FETCH_STORE_COUNT_SUCCESS: {return {...state , mainDataCount : {data : action.payload , loading : false , error : null}}}
        case FETCH_STORE_COUNT_FAILURE: {return {...state , mainDataCount : {data : null , loading : false , error : action.payload}}}
        
        // Fetch Store Products
        case STORE_FETCH_PRODUCTS_BASES_REQUEST : {
            return {...state,products : {products : null , loading : true , error : null}}
        }
        case STORE_FETCH_PRODUCTS_BASES_SUCCESS : {
            return {        
                ...state, products : {
                    products : action.payload.products.length > 0 ? action.payload.products : null,
                    pagination : action.payload.pagination,
                    error : null , 
                    loading : false,
                }
            }
        }   
        case STORE_FETCH_PRODUCTS_BASES_FAILURE : {
            return {...state,products : {products : null , loading : false , error : action.payload}}
        }

        // Fetch Store Brands
        case STORE_FETCH_BRANDS_REQUEST : {
            return {...state,brands : {brands : null, loading : true,error : null}}
        }
        case STORE_FETCH_BRANDS_SUCCESS : {
            return {...state,brands : {brands : action.payload.brands, loading : false,error : null}}
        }
        case STORE_FETCH_BRANDS_FAILURE : {
            return {...state,brands : {brands : null, loading : false,error : action.payload}}
        }

        // Fetch Store Categories
        case STORE_FETCH_CATEGORIES_REQUEST : { return { ...state, categories:{ categories : null , loading : true, error : null,}}}
        case STORE_FETCH_CATEGORIES_SUCCESS : { return { ...state, categories : { categories : action.payload.categories, loading : false, error : null}}}
        case STORE_FETCH_CATEGORIES_FAILURE : {return { ...state, categories : { categories : null, loading : false, error : action.payload}}}

        //  Insert Store Product
        case STORE_INSERT_PRODUCT_REQUEST : { return { ...state, products:{ products : null , loading : true, error : null,}}}
        // case STORE_FETCH_CATEGORIES_SUCCESS : { return { ...state, categories : { categories : action.payload.categories, loading : false, error : null}}}
        case STORE_INSERT_PRODUCT_FAILURE : {return { ...state, products : { products : null, loading : false, error : action.payload}}}

        default: return state
    }
}