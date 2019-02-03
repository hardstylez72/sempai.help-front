
const messageState = {
	error: '',
	errorShow: false,
	info: '',
	infoShow: false,
	warn: '',
	warnShow: false,
	success: '',
	successShow: false,
};

const messageReducer = (state = messageState, action) => {
	switch(action.type) {
		case 'LOG_ERROR':
			return {...state,
				errorShow: action.payload.show,
				error: action.payload.error,
			};
		case 'LOG_INFO':
			return {...state,
				infoShow: action.payload.show,
				info: action.payload.info,
			};
		case 'LOG_WARN':
			return {...state,
				warnShow: action.payload.show,
				warn: action.payload.warn,
			};
		case 'LOG_SUCC':
			return {...state,
				successShow: action.payload.show,
				success: action.payload.success,
			};
		default:
			return state;
	}
};


export {messageReducer, messageState};
