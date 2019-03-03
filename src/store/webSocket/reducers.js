
const webSocketState = { connection: null, };

const webSocketReducer = (state = webSocketState, action) => {
    switch (action.type) {
    case 'REGISTER_WEBSOCKET':
        return {
            ...state,
            connection: action.payload,
        };
    default:
        return state;
    }
};


export { webSocketReducer, };
