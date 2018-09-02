import store from '../rootStore';
const {login} = store.getState();

export const loginActions = {
	GET_UID: 'GET_UID',
	LOGIN_PARAMS: 'LOGIN_PARAMS',

	getUID: () => {
	},
	curUserLogin: (params) => {
		return store.dispatch({type: 'LOGIN_PARAMS', payload: {login: params.login, pwd: params.pwd, uuid: login.uuid}});
	},
	checkAuth: () => {
		return async () => {
			try {
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
								uuid: res.data.uuid
							}});
							return Promise.resolve(true);
						} else {
							return Promise.reject('Ошибка при обмене с сервером');
						}
					});
				return Promise.resolve(true);
			} catch(err) {
				return Promise.reject(false);
			}
		}
	}
};