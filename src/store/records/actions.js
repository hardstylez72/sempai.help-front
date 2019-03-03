import store from '../rootStore';
import { makeRequest, request, } from '../api/request.js';

export const loginActions = {
    GET_UID     : 'GET_UID',
    LOGIN_PARAMS: 'LOGIN_PARAMS',
    AUTH_STATE  : 'AUTH_STATE',

    getArticles: (url, amount, offset, filter) => new Promise((resolve, reject) => {
        fetch(url, {
            method : 'post',
            headers: {
                Accept        : 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: {
                    amount,
                    offset,
                    filter,
                },
            }),
        })
            .then(res => res.json())
            .then(dataFromServer => {
                if ('1' === dataFromServer.success) {
                    resolve(dataFromServer.data.filter(el => false === el.deleted));
                } else {
                    reject('Ошибка при обмене с сервером');
                }
            })
            .catch(err => {
                reject(err);
            });
    }),
    updateRecord: data => new Promise((resolve, reject) => {
        request(window.api.UPDATE_RECORD, data)
            .then(dataFromServer => {
                if ('1' === dataFromServer.success) {
                    resolve();
                } else {
                    reject('Ошибка при обмене с сервером');
                }
            })
            .catch(err => {
                reject(err);
            });
    }),
};
