
const loginState = {
    login: null,
    pwd: null,
	uuid: null,
	isAuthRequired: true,
	authState: false
};

 const loginReducer = (state = loginState, action) => {
    switch(action.type) {
		case 'LOGIN_PARAMS':
			return {...state,
				login: action.payload.login,
				pwd: action.payload.pwd,
				uuid: action.payload.uuid,
				isAuthRequired: action.payload.isAuthRequired
			};
		case 'AUTH_STATE':
			return {...state, authState: action.payload};
        default:
            return state;
    }
};


export {loginReducer, loginState};
