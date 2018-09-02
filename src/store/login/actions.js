import store from '../rootStore';
export const loginActions = {
	GET_UID: 'GET_UID',
	LOGIN_PARAMS: 'LOGIN_PARAMS',

	getUID: () => {
	},
	curUserLogin: (params) => {
		return store.dispatch({type: 'LOGIN_PARAMS', payload: {login: params.login, pwd: params.pwd}});
	}
};