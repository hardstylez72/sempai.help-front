
const loginState = {
    login: '',
    pwd: ''

};

 const loginReducer = (state = loginState, action) => {
    switch(action.type) {
		case 'LOGIN_PARAMS':
			return {...state, login: action.payload.login, pwd: action.payload.pwd};
        default:
            return state;
    }
}


export {loginReducer, loginState};
