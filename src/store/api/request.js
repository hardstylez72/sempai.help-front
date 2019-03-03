import { messagesActions, } from '../messages/actions';
import store from '../rootStore';
import axios from 'axios';

const makeRequest = async (url, method, data) => {
    try { // 'http://localhost:4000'
        const options = {
            url,
            method,
            headers: {
                Accept        : 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            data        : 'get' !== method.toLowerCase() ? data : '',
            timeout     : 30000,
            responseType: 'json',
        };

        axios(options)
            .then(res => {
                if (authCheck()) {
                    return Promise.resolve(res);
                }

                return Promise.reject('Авторизация: ошибка при авторизации');
            })
            .catch(err => Promise.reject(err.message));
    } catch (err) {
        console.log(err);

        return Promise.reject(err.message);
    }
};


const authCheck = res => {
    console.log(res);

    return true;
};

const request = async (options, data) => fetch(options.url, {
    method : options.method,
    headers: {
        Accept        : 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data, }),
})
    .then(async res => {
        if ('' !== document.cookie) {
            const cookies = document.cookie.split(';');
            const isOk = cookies.some(el => {
                const data = el.split('=');
                const key = data[0].trim();
                const value = data[1].trim();

                return 'is-token-ok' === key && '1' === value;
            });

            if (isOk) {
                const json = await res.json()
                    .then(async res => res)
                    .catch(() => Promise.reject({ message: 'Ошибка при обработке JSON', }));

                return json;
            }
        }
        throw new Error('Вам необходимо зарегистрироваться');
    })
    .then(res => {
        if (res.success) {
            return Promise.resolve(res.data);
        }

        return Promise.reject(res.error);
    })
    .catch(err => {
        console.error('API ERROR: ', err);
        store.dispatch(messagesActions.logError(err));
        throw err;
    });

const getRequest = async options => fetch(options.url, {
    method : options.method,
    headers: {
        Accept         : 'application/json, text/plain, */*',
        'Content-Type' : 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',

        // 'Token': login.uuid,
    },
    credentials: 'include',
})
    .then(res => {
        if ('' !== document.cookie) {
            const cookies = document.cookie.split(';');
            const isOk = cookies.some(el => {
                const data = el.split('=');
                const key = data[0].trim();
                const value = data[1].trim();

                return 'is-token-ok' === key && '1' === value;
            });

            if (isOk) {
                const json = res.json()
                    .then(res => res)
                    .catch(() => Promise.reject({ message: 'Ошибка при обработке JSON', }));

                return json;
            }
        }

        // Throw new Error('Вам необходимо зарегистрироваться');
    })
    .then(res => {
        if ('1' === res.success) {
            return Promise.resolve(res);
        }

        return Promise.reject(res.error);
    })
    .catch(err => {
        console.log('API ERROR: ', err);
        store.dispatch(messagesActions.logError(err));

        return Promise.reject(err);
    });


export { request, getRequest, makeRequest, };


