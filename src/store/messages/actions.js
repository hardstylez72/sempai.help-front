import store from '../rootStore';
const ERROR_DURATION = 20000;
const DURATION = 3000;
const { message } = store.getState();

export const messagesActions = {
	LOG_ERROR: 'LOG_ERROR',
	LOG_INFO: 'LOG_INFO',
	LOG_WARN: 'LOG_WARN',
	LOG_SUCC: 'LOG_SUCC',

	logError: (payload) => {
		if (!message.errorShow) {
			store.dispatch({type: 'LOG_ERROR', payload: { error: payload, show: true}});
			setTimeout(() => {
				store.dispatch({type: 'LOG_ERROR', payload: { error: '', show: false}});
			}, ERROR_DURATION);
		}
	},
	logWarn: (payload) => {
		if (!message.warnShow) {
			store.dispatch({type: 'LOG_WARN', payload: {warn: payload, show: true}});
			setTimeout(() => {
				store.dispatch({type: 'LOG_WARN', payload: {warn: '', show: false}});
			}, DURATION)
		}
	},
	logInfo: (payload) => {
		if (!message.infoShow) {
			store.dispatch({type: 'LOG_INFO', payload: {info: payload, show: true}});
			setTimeout(() => {
				store.dispatch({type: 'LOG_INFO', payload: {info: '', show: false}});
			}, DURATION)
		}
	},
	logSuccess: (payload) => {
		if (!message.successShow) {
			store.dispatch({type: 'LOG_SUCC', payload: {success: payload, show: true}});
			setTimeout(() => {
				store.dispatch({type: 'LOG_SUCC', payload: {success: '', show: false}});
			}, DURATION)
		}
	},
};