const { 
    ADMIN_FETCH_CATEGORIES_REQUEST, 
    ADMIN_FETCH_CATEGORIES_SUCCESS, 
    ADMIN_FETCH_CATEGORIES_FAILUE
} = require("./admin_manageCategoryTypes");

const initailState = {categories : null , loading : true , error : null}

export const admin_categoriesReducer = (state = initailState , action) => {
     switch (action.type) {
          // Fetch Category
          case ADMIN_FETCH_CATEGORIES_REQUEST:{return {categories : null , loading : true , error : null}}
          case ADMIN_FETCH_CATEGORIES_SUCCESS:{
               return {
                    categories : action.payload.categories.length === 0 ? null : action.payload.categories,
                    pagination : action.payload.pagination,
                    error : null , 
                    loading : false,
               }
          }
          case ADMIN_FETCH_CATEGORIES_FAILUE:{return {categories : null , loading : false , error : action.payload}}

          default: return  state
     }
}
