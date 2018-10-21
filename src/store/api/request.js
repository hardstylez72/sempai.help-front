import { messagesActions } from '../messages/actions';
import store from '../rootStore';
import axios from 'axios';

const makeRequest = async (url, method, data) => {
	try { // 'http://localhost:4000'
		const options = {
			url: url,
			method: method,
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			data: (method.toLowerCase() !== 'get' ? data : ''),
			timeout: 4000,
			responseType: 'json',
			withCredentials: true
		};
		axios(options)
			.then(res => {
				if (authCheck()) {
					return Promise.resolve(res);
				}
				return Promise.reject('Авторизация: ошибка при авторизации');
			})
			.catch(err => {
				return Promise.reject(err.message);
			});


	} catch (err) {
		console.log(err);
		return Promise.reject(err.message);
	}
};


const authCheck = (res) => {
	console.log(res);
	return true
};

const productionPreffix = (process.env.NODE_ENV === 'production') ? /api/ : '';

const request = async (url, method, data) => fetch(productionPreffix + url, {
		method: method,
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then(res => {
		if (document.cookie !== '') {
			const cookies = document.cookie.split(';');
			const isOk = cookies.some(el => {
				const data = el.split('=');
				const key = data[0].trim();
				const value = data[1].trim();
				return key === 'is-token-ok' && value === '1';
			});
			if (isOk) {
				const json = res.json()
					.then(res => {
						return res;
					})
					.catch(() => {
						return Promise.reject(({message: 'Ошибка при обработке JSON'}));
					});
				return json;
			}
		}
			throw new Error('Вам необходимо зарегистрироваться');
	})
	.then(res => {
		if (res.success === '1') {
			return Promise.resolve(res);
		}
		return Promise.reject(res.error);
	})
	.catch(err => {
		console.log('API ERROR: ', err);
		store.dispatch(messagesActions.logError(err));
		return Promise.reject(err);
	});


const getRequest = async (url) => fetch(productionPreffix + url, {
	method: 'GET',
	headers: {
		'Accept': 'application/json, text/plain, */*',
		'Content-Type': 'application/json',
		'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
		//'Token': login.uuid,
	},
	credentials: 'include',
})
	.then(res => {
		if (document.cookie !== '') {
			const cookies = document.cookie.split(';');
			const isOk = cookies.some(el => {
				const data = el.split('=');
				const key = data[0].trim();
				const value = data[1].trim();
				return key === 'is-token-ok' && value === '1';
			});
			if (isOk) {
				const json = res.json()
					.then(res => {
						return res;
					})
					.catch(() => {
						return Promise.reject(({message: 'Ошибка при обработке JSON'}));
					});
				return json;
			}
		}
		//throw new Error('Вам необходимо зарегистрироваться');
	})
	.then(res => {
		if (res.success === '1') {
			return Promise.resolve(res);
		}
		return Promise.reject(res.error);
	})
	.catch(err => {
		console.log('API ERROR: ', err);
		store.dispatch(messagesActions.logError(err));
		return Promise.reject(err);
	});


export {request, getRequest, makeRequest};


