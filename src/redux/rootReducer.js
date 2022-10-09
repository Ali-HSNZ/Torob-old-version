import {combineReducers} from 'redux'
import { historyReducer } from './history/historyReducer'
import { userSignupReduser } from './user/userReducer'
import {likesReducer} from './like/likeReducer'
import { analyticsReducer } from './analytics/analyticsReducer'
import {storeReducer} from './store/storeReducer'
const rootReducer = combineReducers({
    auth : userSignupReduser,
    history : historyReducer,
    likes : likesReducer,
    analytics : analyticsReducer,
    store : storeReducer
})
export default rootReducer