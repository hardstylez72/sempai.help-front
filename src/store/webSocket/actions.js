import store from '../rootStore';
import io from 'socket.io-client';

export const webSocketActions = {
    REGISTER_WEBSOCKET: 'REGISTER_WEBSOCKET',
    register() {
        const URL = `${process.env.REACT_APP_WEBSOCKET_HOST}:${process.env.REACT_APP_WEBSOCKET_PORT}`;
        const socket = io(URL, {
            reconnectionDelayMax: 1000,
            timeout             : 5000,
        });

        socket.connect();
        console.log(`Готовится подключение к сокету: ${URL}`);
        console.log(socket);

        return store.dispatch({
            type   : 'REGISTER_WEBSOCKET',
            payload: socket,
        });
    },
};
