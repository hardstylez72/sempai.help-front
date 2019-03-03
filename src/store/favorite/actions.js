import store from '../rootStore';
import { request, } from '../api/request.js';

export const loginActions = {
    FAVORITES_STATE: 'FAVORITES_STATE',
    addFav         : () => async () => {
        try {
            const { login, } = store.getState();

            await request(window.api.AUTH, login)
                .then(res => {
                    store.dispatch({
                        type   : 'LOGIN_PARAMS',
                        payload: {
                            login: res.data.login,
                            pwd  : res.data.pwd,
                            uuid : res.data.uuid,
                        },
                    });
                });
            store.dispatch(loginActions.isAuthsuccess(true));

            return Promise.resolve(true);
        } catch (err) {
            store.dispatch(loginActions.isAuthsuccess(false));

            return Promise.reject(false);
        }
    },
    deleteFav: () => async () => {
        try {
            const { login, } = store.getState();

            await request(window.api.AUTH, login)
                .then(res => {
                    store.dispatch({
                        type   : 'LOGIN_PARAMS',
                        payload: {
                            login: res.data.login,
                            pwd  : res.data.pwd,
                            uuid : res.data.uuid,
                        },
                    });
                });
            store.dispatch(loginActions.isAuthsuccess(true));

            return Promise.resolve(true);
        } catch (err) {
            store.dispatch(loginActions.isAuthsuccess(false));

            return Promise.reject(false);
        }
    },
};
