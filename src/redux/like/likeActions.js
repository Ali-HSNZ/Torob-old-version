import axios from "axios"
import Cookies from 'universal-cookie';
import { 
    FETCH_LIKES_FAILURE, 
    FETCH_LIKES_REQUEST, 
    FETCH_LIKES_SUCCESS,
    INSERT_LIKE_LOADING
} from "./likeTypes";

const fetchLikeRequest = (payload) => {return {type : FETCH_LIKES_REQUEST , hash_id : payload}}
const fetchLikeSuccess = (payload) => {return {type : FETCH_LIKES_SUCCESS , payload}}
const fetchLikeFailure = (payload) => {return {type : FETCH_LIKES_FAILURE , payload}}

export const fetchLikes = () => {
    const token = new Cookies().get("userToken");
    return (dispatch) => {
        dispatch(fetchLikeRequest())
        axios.get(`https://project-torob-clone.iran.liara.run/api/user/favorites`, {headers : {Authorization : `Bearer ${token}`}})
            .then(({data}) => dispatch(fetchLikeSuccess(data.favorites)))
            .catch(error => dispatch(fetchLikeFailure(error.response.data.message)))
    }
}
export const likedAction  = ({hash_id}) => {
    const token = new Cookies().get("userToken");
    return (dispatch) => {
        // dispatch(fetchLikeRequest())
        dispatch({type : INSERT_LIKE_LOADING , hash_id})
        axios.put(`https://project-torob-clone.iran.liara.run/api/user/${hash_id}/favorites`, {} ,  {headers : {Authorization : `Bearer ${token}`}})
            .then(()=> {
                axios.get(`https://project-torob-clone.iran.liara.run/api/user/favorites`,{headers : {Authorization : `Bearer ${token}`}})
                .then(({data}) => dispatch(fetchLikeSuccess(data.favorites)))
            })
            .catch(error => dispatch(fetchLikeFailure(error.response.data.message)))
    }
}