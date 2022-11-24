import {combineReducers} from 'redux'

import { historyReducer } from './history/historyReducer'
import { authReduser } from './user/userReducer'
import {likesReducer} from './like/likeReducer'
import { analyticsReducer } from './analytics/analyticsReducer'
import {storeReducer} from './store/storeReducer'
import {admin_categoriesReducer} from './admin/admin_manageCategory/admin_manageCategoryReducer'
import { admin_brandsReducer } from './admin/admin_manageBrand/admin_manageBrandReducer'
import { admin_productsReducer } from './admin/admin_manageProducts/admin_manageProductsReducer'
import { admin_storesReducer } from './admin/admin_manageStores/admin_manageStoresReducer'
import { admin_manageUsersReducer } from './admin/admin_manageUsers/admin_manageUsersReducer'
import { manageStoreReducer } from './manage-store/manageStore_reducer'

const rootReducer = combineReducers({
    auth : authReduser,
    history : historyReducer,
    likes : likesReducer,
    analytics : analyticsReducer,
    store : storeReducer,

    // Admin Panel Reducers
    admin_brands : admin_brandsReducer,
    admin_categories : admin_categoriesReducer,
    admin_products : admin_productsReducer,
    admin_stores : admin_storesReducer,
    admin_users : admin_manageUsersReducer,
    
    // Store Panel Reducers 
    manage_store : manageStoreReducer,
})
export default rootReducer