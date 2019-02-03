import store from '../rootStore';
import { request, makeRequest } from '../api/request.js'
import {webSocketActions} from '../webSocket/actions';

export const loginActions = {
	GET_UID: 'GET_UID',
	LOGIN_PARAMS: 'LOGIN_PARAMS',
	AUTH_STATE: 'AUTH_STATE',

	curUserLogin: (params) => {
		return async () => {
			let {login} = store.getState();
			store.dispatch({type: 'LOGIN_PARAMS', payload: {
				login: params.login,
				pwd: params.pwd,
				uuid: login.uuid,
			}});
			await store.dispatch(loginActions.checkAuth());
			return () => {};
		}
	},
	checkAuth: () => {
		return async () => {
			try {
				const {login} = store.getState();
				await request(window.api.AUTH, login)
					.then(res => {
						store.dispatch({type: 'LOGIN_PARAMS', payload: {
							login: res.data.login,
							pwd: res.data.pwd,
							uuid: res.data.uuid
						}});
					});
				// store.dispatch(webSocketActions.register());
				store.dispatch(loginActions.isAuthsuccess(true));
				return Promise.resolve(true);
			} catch(err) {
				store.dispatch(loginActions.isAuthsuccess(false));
				return Promise.reject(false);
			}
		}
	},
	isUserAuthorised: () => {
		return async () => {
			try {
				await request(window.api.AUTH, {ok: 1});
				//store.dispatch(webSocketActions.register());
				store.dispatch(loginActions.isAuthsuccess(true));
			} catch(err) {
				store.dispatch(loginActions.isAuthsuccess(false));
			}
		}
	},
	isAuthsuccess: (value) => {
		return store.dispatch({type: 'AUTH_STATE', payload: value})
	}
};