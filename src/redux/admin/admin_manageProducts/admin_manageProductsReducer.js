import { 
    ADMIN_FETCH_PRODUCTS_FAILURE, 
    ADMIN_FETCH_PRODUCTS_REQUEST, 
    ADMIN_FETCH_PRODUCTS_SUCCESS ,

    ADMIN_FETCH_ONE_PRODUCT_FAILURE, 
    ADMIN_FETCH_ONE_PRODUCT_REQUEST, 
    ADMIN_FETCH_ONE_PRODUCT_SUCCESS ,

    ADMIN_FETCH_BRANDS_REQUEST, 
    ADMIN_FETCH_BRANDS_SUCCESS, 
    ADMIN_FETCH_BRANDS_FAILURE,

    ADMIN_FETCH_CATEGORIES_REQUEST, 
    ADMIN_FETCH_CATEGORIES_SUCCESS, 
    ADMIN_FETCH_CATEGORIES_FAILURE,

    ADMIN_FETCH_SUB_1_REQUEST, 
    ADMIN_FETCH_SUB_1_SUCCESS, 
    ADMIN_FETCH_SUB_1_FAILURE,

    ADMIN_FETCH_SUB_2_REQUEST, 
    ADMIN_FETCH_SUB_2_SUCCESS, 
    ADMIN_FETCH_SUB_2_FAILURE,

    ADMIN_FETCH_SUB_3_REQUEST, 
    ADMIN_FETCH_SUB_3_SUCCESS, 
    ADMIN_FETCH_SUB_3_FAILURE,
    
} from "./admin_manageProductsTypes"

const initailState = {
    products:{ products : null,loading : false,error : null},
    categories:{categories : null,loading : false,error : null},
    sub1:{categories : null,loading : false,error : null},
    sub2:{categories : null,loading : false,error : null},
    sub3:{categories : null,loading : false,error : null},
    product:{product : null,loading : false,error : null},
    brands:{brands : null,loading : false,error : null},
}

export const admin_productsReducer = (state = initailState , action) => {
    switch (action.type) {
        case ADMIN_FETCH_PRODUCTS_REQUEST:{ return {  ...state, products : { products : null, loading : true, error : null }}}
        case ADMIN_FETCH_PRODUCTS_SUCCESS:{
            return {
                ...state,
                products : {
                    products : action.payload.products.length > 0 ? action.payload.products : null,
                    pagination : action.payload.pagination,
                    error : null , 
                    loading : false,
                }
            }
        }
        case ADMIN_FETCH_PRODUCTS_FAILURE:{ return { ...state, products : { products : null , loading : false , error : action.payload } }}


        case ADMIN_FETCH_ONE_PRODUCT_REQUEST:{ return {  ...state, product : { product : null, loading : true, error : null }}}
        case ADMIN_FETCH_ONE_PRODUCT_SUCCESS:{ return { ...state, product : { product : action.payload, error : null , loading : false, }}}
        case ADMIN_FETCH_ONE_PRODUCT_FAILURE:{ return { ...state, product : { product : null , loading : false , error : action.payload } }}


        case ADMIN_FETCH_BRANDS_REQUEST : {
            return {
                ...state,
                brands : {
                    brands : null, 
                    loading : true,
                    error : null
               }
            }
        }

        case ADMIN_FETCH_BRANDS_SUCCESS : {
            return {
                ...state,
                brands : {
                    brands : action.payload.brands, 
                    loading : false,
                    error : null
               }
            }
        }


        case ADMIN_FETCH_BRANDS_FAILURE : {
            return {
                ...state,
                brands : {
                    brands : null, 
                    loading : false,
                    error : action.payload
               }
            }
        }


        case ADMIN_FETCH_CATEGORIES_REQUEST : { return { ...state, categories:{ categories : null , loading : true, error : null,}}}
        case ADMIN_FETCH_CATEGORIES_SUCCESS : { return { ...state, categories : { categories : action.payload.categories, loading : false, error : null}}}
        case ADMIN_FETCH_CATEGORIES_FAILURE : {return { ...state, categories : { categories : null, loading : false, error : action.payload}}}

        case ADMIN_FETCH_SUB_1_REQUEST : { return { ...state, sub1:{ categories : null , loading : true, error : null,}}}
        case ADMIN_FETCH_SUB_1_SUCCESS : { return { ...state, sub1 : { categories : action.payload.length > 0 ? action.payload : null, loading : false, error : null}}}
        case ADMIN_FETCH_SUB_1_FAILURE : {return { ...state, sub1 : { categories : null, loading : false, error : action.payload}}}


        case ADMIN_FETCH_SUB_2_REQUEST : { return { ...state, sub2:{ categories : null , loading : true, error : null,}}}
        case ADMIN_FETCH_SUB_2_SUCCESS : { return { ...state, sub2 : { categories : action.payload.length > 0 ? action.payload : null, loading : false, error : null}}}
        case ADMIN_FETCH_SUB_2_FAILURE : {return { ...state, sub2 : { categories : null, loading : false, error : action.payload}}}
 
        case ADMIN_FETCH_SUB_3_REQUEST : { return { ...state, sub3:{ categories : null , loading : true, error : null,}}}
        case ADMIN_FETCH_SUB_3_SUCCESS : { return { ...state, sub3 : { categories : action.payload.length > 0 ? action.payload : null, loading : false, error : null}}}
        case ADMIN_FETCH_SUB_3_FAILURE : {return { ...state, sub3 : { categories : null, loading : false, error : action.payload}}}

        default: return  state
    }
}
