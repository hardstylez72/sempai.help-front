
const loginState = {
    login    : null,
    pwd      : null,
    uuid     : null,
    authState: false,
    webSocket: {},
};

const loginReducer = (state = loginState, action) => {
    switch (action.type) {
    case 'LOGIN_PARAMS':
        return {
            ...state,
            login: action.payload.login,
            pwd  : action.payload.pwd,
            uuid : action.payload.uuid,
        };
    case 'AUTH_STATE':
        return {
            ...state,
            authState: action.payload,
        };
    default:
        return state;
    }
};


export { loginReducer, loginState, };
