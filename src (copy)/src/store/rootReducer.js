import { combineReducers } from 'redux';
import { playerReducer } from './player/reducers.js'

const rootReducer = combineReducers({
    playerReducer

});
export default rootReducer;
