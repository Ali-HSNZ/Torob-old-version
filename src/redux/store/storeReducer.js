const {
  FETCH_STORE_REQUEST,
  FETCH_STORE_SUCCESS,
  FETCH_STORE_FAILURE,
  REMOVE_STORE_DATA
} = require("./storeTypes");

const initialState = { store: null, loading: false, error: null };

export const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STORE_REQUEST: {return { store: null, loading: true, error: null }}
    case FETCH_STORE_SUCCESS: {return { store: action.payload, loading: false, error: null }}
    case FETCH_STORE_FAILURE: {return { store: null, loading: false, error: action.payload }}
    case REMOVE_STORE_DATA: {return { store: null, loading: false, error: null }}
    default: return state;
  }
};
