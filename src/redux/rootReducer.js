import { combineReducers } from "redux";

import { historyReducer } from "./history/historyReducer";
import { authReduser } from "./user/userReducer";
import { likesReducer } from "./like/likeReducer";
import { analyticsReducer } from "./analytics/analyticsReducer";
import { storeReducer } from "./store/storeReducer";
import { admin_categoriesReducer } from "./admin/admin_manageCategory/admin_manageCategoryReducer";
import { admin_brandsReducer } from "./admin/admin_manageBrand/admin_manageBrandReducer";
import { admin_productsReducer } from "./admin/admin_manageProducts/admin_manageProductsReducer";
import { admin_storesReducer } from "./admin/admin_manageStores/admin_manageStoresReducer";
import { admin_manageUsersReducer } from "./admin/admin_manageUsers/admin_manageUsersReducer";
import { manageStoreReducer } from "./manage-store/manageStore/manageStore_reducer";
import { store_companyProductsReducer } from "./manage-store/companyProducts/companyProducts_reducer";
import { admin_dataCountReducer } from "./admin/admin_dataCount/admin_dataCountReducer";
import { signupReducer } from "./signup/signupReducer";
import { admin_changePasswordReducer } from "./admin/admin_changePassword.js/admin_changePasswordReducer";
import { cartReducer } from "./cart/cart/cartReducer";
import { checkoutReducer } from "./cart/checkout/checkoutReducer";
import { categoriesReducer } from "./categories/categoriesReducer";
import { store_factorReducer } from "./manage-store/manageFactors/manageFactors_reducer";

const rootReducer = combineReducers({
     // User
     auth: authReduser,
     history: historyReducer,
     likes: likesReducer,
     analytics: analyticsReducer,
     store: storeReducer,

     // Admin Panel Reducers
     admin_brands: admin_brandsReducer,
     admin_categories: admin_categoriesReducer,
     admin_products: admin_productsReducer,
     admin_stores: admin_storesReducer,
     admin_users: admin_manageUsersReducer,
     admin_dataCount: admin_dataCountReducer,
     admin_changePassword : admin_changePasswordReducer,

     // Store Panel Reducers
     manage_store: manageStoreReducer,
     store_companyProducts: store_companyProductsReducer,
     store_factor : store_factorReducer,

     // Signup User And Store
     signupReducer: signupReducer,

     // Cart
     cart : cartReducer,

     // Checkout
     checkout : checkoutReducer,

     // Categories
     categories : categoriesReducer
});

export default rootReducer;