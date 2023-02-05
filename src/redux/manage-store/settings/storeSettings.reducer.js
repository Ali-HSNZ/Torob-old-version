import { 
     CHANGE_MIN_SHOPPING_COUNT_REQUEST, 
     CHANGE_MIN_SHOPPING_COUNT_SUCCESS, 
     CHANGE_MIN_SHOPPING_COUNT_FAILURE,
} from "./storeSettings_types";

const initailState = {data : null , error : null , loading : false}

export const storeSettingReducer = (state = initailState , action) => {
     switch (action.type) {
          case CHANGE_MIN_SHOPPING_COUNT_REQUEST:{
               return {data : null , error : null , loading : true}
          }
          case CHANGE_MIN_SHOPPING_COUNT_SUCCESS:{
               return {data : action.payload , error : null , loading : false}
          }
          case CHANGE_MIN_SHOPPING_COUNT_FAILURE:{
               return {data : null , error : action.payload , loading : false}
          }    
          default: return state
     }
}