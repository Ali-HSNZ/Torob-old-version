import {combineReducers} from 'redux'

import { historyReducer } from './history/historyReducer'
import { userSignupReduser } from './user/userReducer'
import {likesReducer} from './like/likeReducer'
import { analyticsReducer } from './analytics/analyticsReducer'
import {storeReducer} from './store/storeReducer'
import {admin_categoriesReducer} from './admin/admin_manageCategory/admin_manageCategoryReducer'
import { admin_brandsReducer } from './admin/admin_manageBrand/admin_manageBrandReducer'
import { admin_productsReducer } from './admin/admin_manageProducts/admin_manageProductsReducer'

const rootReducer = combineReducers({
    auth : userSignupReduser,
    history : historyReducer,
    likes : likesReducer,
    analytics : analyticsReducer,
    store : storeReducer,
    admin_brands : admin_brandsReducer,
    admin_categories : admin_categoriesReducer,
    admin_products : admin_productsReducer,
})
export default rootReducer