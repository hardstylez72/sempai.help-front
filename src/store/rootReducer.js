import { combineReducers } from 'redux';
import { playerReducer } from './player/reducers.js'
import { loginReducer } from './login/reducers.js'


const rootReducer = combineReducers({
    player: playerReducer,
    login: loginReducer

});
export default rootReducer;
