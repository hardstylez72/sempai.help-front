import store from '../rootStore';
const {login} = store.getState();

export const loginActions = {
	GET_UID: 'GET_UID',
	LOGIN_PARAMS: 'LOGIN_PARAMS',
	AUTH_STATE: 'AUTH_STATE',

	getUID: () => {
	},
	curUserLogin: (params) => {
		return async () => {
			let {login} = store.getState()
			store.dispatch({type: 'LOGIN_PARAMS', payload: {
				login: params.login,
				pwd: params.pwd,
				uuid: login.uuid,
				isAuthRequired: true
			}});
			await store.dispatch(loginActions.checkAuth());
			return () => {}
			 let {logi1n} = store.getState()
			console.log('few')
		}
	},
	checkAuth: () => {
		return async () => {
			try {
				const {login} = store.getState();
				if (login.isAuthRequired === false) {
					return Promise.resolve(true);
				}
				const data = await fetch('/', {
					method: 'post',
					headers: {
						'Accept': 'application/json, text/plain, */*',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(login)
				})
					.then(res => {
						return res.json()
					})
					.then(res => {
						if (res.sucsess === '1') {
							store.dispatch({type: 'LOGIN_PARAMS', payload: {
								login: res.data.login,
								pwd: res.data.pwd,
								uuid: res.data.uuid,
								isAuthRequired: false
							}});
							return Promise.resolve(true);
						} else {
							return Promise.reject('Ошибка при обмене с сервером');
						}
					});
				store.dispatch(loginActions.isAuthSucsess(true));
				return Promise.resolve(true);
			} catch(err) {
				store.dispatch(loginActions.isAuthSucsess(false));
				return Promise.reject(false);
			}
		}
	},
	isAuthSucsess: (value) => {
		return store.dispatch({type: 'AUTH_STATE', payload: value})
	}
};