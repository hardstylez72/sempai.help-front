import { createStore } from 'redux';
import rootReducer from './rootReducer';
import initState from './rootInitialState'

const store = createStore(rootReducer, initState);

export default store;