import store from '../rootStore';
import socketIOClient from 'socket.io-client';

export const webSocketActions = {
	REGISTER_WEBSOCKET: 'REGISTER_WEBSOCKET',
	register: () => {
		const URL = `${process.env.REACT_APP_WEBSOCKET_HOST}:${process.env.REACT_APP_WEBSOCKET_PORT}`;
		const socket = socketIOClient(URL);
		store.dispatch({type: 'REGISTER_WEBSOCKET', payload: socket});
		return () => {}
	}
};