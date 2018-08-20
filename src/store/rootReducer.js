import { combineReducers } from 'redux';
import { playerReducer } from './player/reducers.js'

const rootReducer = combineReducers({
    palyer: playerReducer

});
export default rootReducer;
