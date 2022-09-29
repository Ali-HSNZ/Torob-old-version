import {combineReducers} from 'redux'
import { historyReducer } from './history/historyReducer'
import { userSignupReduser } from './user/userReducer'
import {likesReducer} from './like/likeReducer'
import { analyticsReducer } from './analytics/analyticsReducer'

const rootReducer = combineReducers({
    auth : userSignupReduser,
    history : historyReducer,
    likes : likesReducer,
    analytics : analyticsReducer
})
export default rootReducer