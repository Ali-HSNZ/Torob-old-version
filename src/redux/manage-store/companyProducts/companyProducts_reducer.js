import { 
    STORE_FETCH_COMPANY_PRODUCTS_REQUEST, 
    STORE_FETCH_COMPANY_PRODUCTS_SUCCESS,
    STORE_FETCH_COMPANY_PRODUCTS_FAILURE, 

    STORE_FETCH_COMPANY_ONE_PRODUCT_REQUEST, 
    STORE_FETCH_COMPANY_ONE_PRODUCT_SUCCESS,
    STORE_FETCH_COMPANY_ONE_PRODUCT_FAILURE, 
} from "./companyProducts_Types"

const initialValues = {
     products : null , 
     loading : false , 
     error : null , 
     oneProduct : {product : null , loading : false , error : null}
}

export const store_companyProductsReducer = (state = initialValues , action) => {
    switch (action.type) { 
          // Fetch Store Products State
          case STORE_FETCH_COMPANY_PRODUCTS_REQUEST:{return  {...state,products : null , loading : true , error : null}}
          case STORE_FETCH_COMPANY_PRODUCTS_SUCCESS:{
               const availableBaseProducts = action.payload.products.filter(product => product.base_product != null)
               return {
                    ...state,
                    products : action.payload.products.length > 0 ? availableBaseProducts : null,
                    pagination : action.payload.pagination,
                    error : null , 
                    loading : false,
               }
          }
          case STORE_FETCH_COMPANY_PRODUCTS_FAILURE:{return  {...state,products : null , loading : false , error : action.payload}}

          // Fetch Store One Product State
          case STORE_FETCH_COMPANY_ONE_PRODUCT_REQUEST:{ return {  ...state, oneProduct : { product : state.oneProduct.product, loading : true, error : null }}}
          case STORE_FETCH_COMPANY_ONE_PRODUCT_SUCCESS:{ return { ...state, oneProduct : { product : action.payload, error : null , loading : false, }}}
          case STORE_FETCH_COMPANY_ONE_PRODUCT_FAILURE:{ return { ...state, oneProduct : { product : null , loading : false , error : action.payload } }}

          default: return state;
    }
}