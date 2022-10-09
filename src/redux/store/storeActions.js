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
          .then((res) => dispatch(fetchStoreSuccess(res.data.data.filtered)))
          .catch((error) =>
            dispatch(fetchStoreFailure(error.response.data.message))
          );
    }
  };
};