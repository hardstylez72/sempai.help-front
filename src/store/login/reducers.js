
const loginState = {
    login: '',
    pwd: '',
	uuid: ''
};

 const loginReducer = (state = loginState, action) => {
    switch(action.type) {
		case 'LOGIN_PARAMS':
			return {...state, login: action.payload.login, pwd: action.payload.pwd, uuid: action.payload.uuid};
        default:
            return state;
    }
}


export {loginReducer, loginState};
