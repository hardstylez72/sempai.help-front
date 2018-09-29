import { messagesActions } from '../messages/actions';
import store from '../rootStore';
const { login } = store.getState();

const request = async (url, data) => fetch(url, {
		method: 'post',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json',
			'Token': login.uuid,
		},
		credentials: 'include',
		body: JSON.stringify(data)
	})
	.then(res => {
		const cookies = document.cookie.split(';');
		const isOk = cookies.some(el => {
			const data = el.split('=');
			const key = data[0].trim();
			const value = data[1].trim();
			return key === 'is-token-ok' && value === '1';
		});
		if (isOk) {
			return res.json();
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

export {request};


