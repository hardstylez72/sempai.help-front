import { combineReducers } from 'redux';
import { playerReducer } from './player/reducers.js'
import { loginReducer } from './login/reducers.js'
import { messageReducer } from './messages/reducers.js'


const rootReducer = combineReducers({
    player: playerReducer,
    login: loginReducer,
	message: messageReducer

});
export default rootReducer;
