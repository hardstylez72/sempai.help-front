import store from '../rootStore';
import { request, makeRequest } from '../api/request.js'

export const loginActions = {
	GET_UID: 'GET_UID',
	LOGIN_PARAMS: 'LOGIN_PARAMS',
	AUTH_STATE: 'AUTH_STATE',

	getArticles: (url, amount, offset, filter) => {
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: 'post',
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({data: {amount, offset, filter}}),
			})
				.then(res => res.json())
				.then(dataFromServer => {
					if (dataFromServer.success === '1') {
						resolve(dataFromServer.data.filter(el => el.deleted === false));
					} else {
						reject('Ошибка при обмене с сервером');
					}
				})
				.catch(err => {
					reject(err);
				});
		})
	},
	updateRecord: data => {
		return new Promise((resolve, reject) => {
			request(window.api.UPDATE_RECORD, data)
				.then(dataFromServer => {
					if (dataFromServer.success === '1') {
						resolve();
					} else {
						reject('Ошибка при обмене с сервером');
					}
				})
				.catch(err => {
					reject(err);
				});
		});
	}
};