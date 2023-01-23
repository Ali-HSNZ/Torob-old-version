import http from "src/services/http";
import {
  FETCH_STORE_REQUEST,
  FETCH_STORE_SUCCESS,
  FETCH_STORE_FAILURE,
  REMOVE_STORE_DATA
} from "./storeTypes";

const fetchStoreReuqest = () => { return { type: FETCH_STORE_REQUEST }};
const fetchStoreSuccess = (payload) => {return { type: FETCH_STORE_SUCCESS, payload }};
const fetchStoreFailure = (payload) => {return { type: FETCH_STORE_FAILURE, payload }};

export const removeStoreData = (payload) => {return { type: REMOVE_STORE_DATA, payload }};

export const fetchStore = (hashId, CitiesToText) => dispatch => {
    if(CitiesToText){
          dispatch(fetchStoreReuqest());
          http.get(encodeURI(`product/${hashId}/sales?cities=${CitiesToText}`))
          .then(({data}) => {
               const availableStore_list = data.data.filtered.filter(store => store.offer.is_available === true)
               dispatch(fetchStoreSuccess(availableStore_list))
          })
          .catch((error) =>
               dispatch(fetchStoreFailure(error.response.data.message))
          );
    }
};