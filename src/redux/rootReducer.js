import {combineReducers} from 'redux'
import { userSignupReduser } from './user/userReducer'

const rootReducer = combineReducers({
    userSignup : userSignupReduser,
})
export default rootReducer