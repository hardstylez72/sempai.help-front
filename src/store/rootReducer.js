import { combineReducers } from 'redux';
import { playerReducer } from './player/reducers.js'
import { loginReducer } from './login/reducers.js'
import { messageReducer } from './messages/reducers.js'
import { webSocketReducer } from './webSocket/reducers.js'

const rootReducer = combineReducers({
    player: playerReducer,
    login: loginReducer,
	message: messageReducer,
	webSocket: webSocketReducer
});
export default rootReducer;
