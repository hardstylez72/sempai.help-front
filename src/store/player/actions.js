import store from '../rootStore';
import {Base64} from 'js-base64';
import {request, getRequest} from '../api/request';


export const playerActions = {
	PLAY_MUSIC: 'PLAY_MUSIC',
	GET_NEXT_TRACK: 'GET_NEXT_TRACK',
	GET_PREV_TRACK: 'GET_PREV_TRACK',
	SONG_PLAYING_NAME: 'SONG_PLAYING_NAME',
	SONG_PLAYING_URL: 'SONG_PLAYING_URL',
	COVER_IMAGE: 'COVER_IMAGE',
	FOLDER_STRUCT: 'FOLDER_STRUCT',
	VOLUME: 'VOLUME',
	MUSIC_SEEKBAR_VALUE: 'MUSIC_SEEKBAR_VALUE',
	DURATION: 'DURATION',
	IS_SEEKING: 'IS_SEEKING',
	TRACK_INFO: 'TRACK_INFO',
	FAVORITE_STRUCT: 'FAVORITE_STRUCT',
	UPLOADED_STRUCT: 'UPLOADED_STRUCT',
	ADD_TO_FAVORITE_STRUCT: 'ADD_TO_FAVORITE_STRUCT',

	setTrackInfo: (info) => {
		return store.dispatch({type: 'TRACK_INFO', payload: info});
	},
	setSeeking: (seeking) => {
		return store.dispatch({type: 'IS_SEEKING', payload: seeking});
	},
	setDuration: (duration) => {
		return store.dispatch({type: 'DURATION', payload: duration});
	},
	changeVolume: value => {
		value = Number(value)/100;
		return store.dispatch({type: 'VOLUME', payload: value});
	},
	setStruct: (struct, favorite) => {
		return store.dispatch({type: 'FOLDER_STRUCT', payload: struct});
	},
	setFavoriteStruct: (favorite) => {
		return store.dispatch({type: 'FAVORITE_STRUCT', payload: favorite});
	},
	addToFavoriteStruct: (favorite) => {
		return store.dispatch({type: 'ADD_TO_FAVORITE_STRUCT', payload: favorite});
	},
	setUpdateStruct: (uploaded) => {
		return store.dispatch({type: 'UPLOADED_STRUCT', payload: uploaded});
	},
	audioPaused: () => {
		return store.dispatch({type: 'PLAY_MUSIC', payload: false});
	},
	audioPlaying: () => {
		return store.dispatch({type: 'PLAY_MUSIC', payload: true});
	},
	getNextTrack: (baseFolderStruct, trackName) => {
		if (!trackName || !baseFolderStruct) {
			return () => {
				return Promise.reject();
			};
		}

		let baseNode = baseFolderStruct;
		let isPlayingTrackFound = false;
		let isNextTrackFound = false;
		let nextTrack = '';

		(async () => {
			await (function searchInTree(node) {
				if (isNextTrackFound) {
					return;
				}
				if (node.children) {
					for (let index = 0; index < node.children.length; index++) {
						let el = node.children[index];
						if (isNextTrackFound) {
							break;
						}
						if (
							isPlayingTrackFound &&
							el.type === 'file' &&
							(el.extension === '.flac' || el.extension === '.mp3')
						) {
							isNextTrackFound = true;
							nextTrack = el;
							nextTrack.active = false;
							return Promise.resolve();
						}
						if (el.name === trackName) {
							isPlayingTrackFound = true;
							el.active = true;
						}
						searchInTree(el);
					}
				}
			})(baseNode);
		})();
		return () => {
			return Promise.resolve(nextTrack);
		};
	},
	getPrevTrack: (baseFolderStruct, trackName) => {
		if (!trackName || !baseFolderStruct) {
			return () => {
				return Promise.reject();
			};
		}

		let baseNode = baseFolderStruct;
		let isPlayingTrackFound = false;
		let isNextTrackFound = false;
		let nextTrack = '';

		(async () => {
			await (function searchInTree(node) {
				if (isNextTrackFound) {
					return;
				}
				if (node.children) {
					for (let index = node.children.length - 1; index >= 0; index--) {
						let el = node.children[index];
						if (isNextTrackFound) {
							break;
						}
						if (
							isPlayingTrackFound &&
							el.type === 'file' &&
							(el.extension === '.flac' || el.extension === '.mp3')
						) {
							isNextTrackFound = true;
							nextTrack = el;
							nextTrack.active = false;
							return Promise.resolve(el);
						}
						if (el.name === trackName) {
							el.active = true;
							isPlayingTrackFound = true;
						}
						searchInTree(el);
					}
				}
			})(baseNode);
		})();
		return () => {
			return Promise.resolve(nextTrack);
		};
	},
	playThisSong: (name, path, folderStruct) => {
		if (!name || !path || !folderStruct) {
			return () => {};
		}
		const jsonPath = JSON.stringify({path: path});
		const url = Base64.encodeURI(jsonPath);
		store.dispatch({type: 'SONG_PLAYING_NAME', payload: name});
		store.dispatch({type: 'SONG_PLAYING_URL', payload: url});
		store.dispatch(playerActions.getNextTrack(folderStruct, name)).then(nextTrack => {
			store.dispatch({type: 'GET_NEXT_TRACK', payload: nextTrack});
		});
		store.dispatch(playerActions.getPrevTrack(folderStruct, name)).then(prevTrack => {
			store.dispatch({type: 'GET_PREV_TRACK', payload: prevTrack});
		});
		store.dispatch(playerActions.getCoverImage(path))
			.then(imgURL => {
				const selector = document.getElementById('footer-background');
				selector.style['background'] = `url(${imgURL})`;
				selector.style['background-size'] = '150px 150px';
			})
			.catch(err => console.log('err', err));
		return () => {};
	},
	getCoverImage: path => {
		return async () => {
			try {
				const {login} = store.getState();
				const jsonPath = JSON.stringify({path: path});
				const url = Base64.encodeURI(jsonPath);
				const img = await request(`/radio/cover/${url}`, 'post', login)
					.then(dataFromServer => {
						if (dataFromServer.success === '1') {
                            store.dispatch({type: 'COVER_IMAGE', payload: dataFromServer.data});
							return Promise.resolve(dataFromServer.data);
						} else {
							return Promise.reject('error while downloading cover');
						}
                    });
				return Promise.resolve(img);
			} catch (err) {
				console.log('error while downloading cover');
                return Promise.reject(err);
			}
		};
	},
	getFolderStruct: (url, method) => {
		return async () => {
			try {
				const data = await request(url, method)
					.then(dataFromServer => {
						if (dataFromServer.success === '1') {
							return Promise.resolve(dataFromServer.data);
						} else {
							return Promise.reject('Ошибка при обмене с сервером');
						}
					});
				return Promise.resolve(data);
			} catch(err) {
				return Promise.reject(err);
			}
		}
	},
	getFavTracks: (url) => {
		return async () => {
			try {
				const data = await getRequest(url)
					.then(dataFromServer => {
						if (dataFromServer.success === '1') {
							return Promise.resolve(dataFromServer.data);
						} else {
							return Promise.reject('Ошибка при обмене с сервером');
						}
					});
				return Promise.resolve(data);
			} catch(err) {
				return Promise.reject(err);
			}
		}
	},
	addUploadedTracks: (url) => {
		return async () => {
			try {
				const data = await getRequest(url)
					.then(dataFromServer => {
						if (dataFromServer.success === '1') {
							return Promise.resolve(dataFromServer.data);
						} else {
							return Promise.reject('Ошибка при обмене с сервером');
						}
					});
				return Promise.resolve(data);
			} catch(err) {
				return Promise.reject(err);
			}
		}
	},
	getUploadedTracks: () => {
		return async () => {
			try {
				const data = await request('/music/upload/get/', 'post')
					.then(dataFromServer => {
						if (dataFromServer.success === '1') {
							return Promise.resolve(dataFromServer.data);
						} else {
							return Promise.reject('Ошибка при обмене с сервером');
						}
					});
				return Promise.resolve(data);
			} catch(err) {
				return Promise.reject(err);
			}
		}
	}
};
