import rootReducer from './rootReducer'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk'

const masterReducer = (state , action) => {
     if(action.type === HYDRATE) {
         // Save Previous State & Previous Payload
          return  { ...state, ...action.payload }
    }
     return rootReducer(state , action)
};

const makeStore = () =>  createStore(masterReducer , applyMiddleware(thunk));

export const wrapper = createWrapper(makeStore)