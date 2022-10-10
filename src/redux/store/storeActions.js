const { default: axios } = require("axios");
const {
  FETCH_STORE_REQUEST,
  FETCH_STORE_SUCCESS,
  FETCH_STORE_FAILURE,
  REMOVE_STORE_DATA
} = require("./storeTypes");

const fetchStoreReuqest = () => {
  return { type: FETCH_STORE_REQUEST };
};
const fetchStoreSuccess = (payload) => {
  return { type: FETCH_STORE_SUCCESS, payload };
};
const fetchStoreFailure = (payload) => {
  return { type: FETCH_STORE_FAILURE, payload };
};
export const removeStoreData = (payload) => {
  return { type: REMOVE_STORE_DATA, payload };
};

export const fetchStore = (hashId, CitiesToText) => {
  return (dispatch) => {
    if(CitiesToText){
        dispatch(fetchStoreReuqest());
        axios.get(encodeURI(`https://project-torob-clone.iran.liara.run/api/product/${hashId}/sales?cities=${CitiesToText}`))
          .then((res) => {
            const availableStore_list = res.data.data.filtered.filter(store => store.offer.is_available === true)
            dispatch(fetchStoreSuccess(availableStore_list))
          })
          .catch((error) =>
            dispatch(fetchStoreFailure(error.response.data.message))
          );
    }
  };
};