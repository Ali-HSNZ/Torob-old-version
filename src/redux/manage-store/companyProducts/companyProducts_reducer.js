const { 
    STORE_FETCH_COMPANY_PRODUCTS_REQUEST, 
    STORE_FETCH_COMPANY_PRODUCTS_SUCCESS,
    STORE_FETCH_COMPANY_PRODUCTS_FAILURE, 

    STORE_FETCH_COMPANY_ONE_PRODUCT_REQUEST, 
    STORE_FETCH_COMPANY_ONE_PRODUCT_SUCCESS,
    STORE_FETCH_COMPANY_ONE_PRODUCT_FAILURE, 
} = require("./companyProducts_Types")


const initialValues = {products : null , loading : false , error : null , oneProduct : {product : null , loading : false , error : null}}

export const store_companyProductsReducer = (state = initialValues , action) => {
    switch (action.type) { 
        case STORE_FETCH_COMPANY_PRODUCTS_REQUEST:{
            return  {...state,products : null , loading : true , error : null}
        }
        case STORE_FETCH_COMPANY_PRODUCTS_SUCCESS:{
            return {
                ...state,
                products : action.payload.products.length > 0 ? action.payload.products : null,
                pagination : action.payload.pagination,
                error : null , 
                loading : false,
            }
        }
        case STORE_FETCH_COMPANY_PRODUCTS_FAILURE:{
            return  {...state,products : null , loading : false , error : action.payload}
        }

        case STORE_FETCH_COMPANY_ONE_PRODUCT_REQUEST:{ return {  ...state, oneProduct : { product : state.oneProduct.product, loading : true, error : null }}}
        case STORE_FETCH_COMPANY_ONE_PRODUCT_SUCCESS:{ return { ...state, oneProduct : { product : action.payload, error : null , loading : false, }}}
        case STORE_FETCH_COMPANY_ONE_PRODUCT_FAILURE:{ return { ...state, oneProduct : { product : null , loading : false , error : action.payload } }}

        default: return state;
    }
}