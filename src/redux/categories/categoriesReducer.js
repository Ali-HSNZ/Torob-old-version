import { 
     FETCH_CATEGORIES_FAILURE,
     FETCH_CATEGORIES_REQUEST, 
     FETCH_CATEGORIES_SUCCESS 
} from "./categoriesTypes"

const initialState = {categories : null , error : null , loading : false}

export const categoriesReducer = (state = initialState , action) => {
     switch (action.type) {
          case FETCH_CATEGORIES_REQUEST : {return {categories : null , error : null , loading : true}}
          case FETCH_CATEGORIES_SUCCESS : {return {categories : action.payload.data , error : null , loading : false}}
          case FETCH_CATEGORIES_FAILURE : {return {categories : null , error : action.payload , loading : false}}
          default : return state
     }
}