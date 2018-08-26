import store from '../rootStore';
import {Base64} from 'js-base64';
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

	setCurStat: (stats, duration) => {
		store.dispatch({type: 'DURATION', payload: {stats, duration}});
		return () => {};
	},
	changeVolume: value => {
		store.dispatch({type: 'VOLUME', payload: value});
		return () => {};
	},
	changeSeekBar: value => {
		store.dispatch({type: 'MUSIC_SEEKBAR_VALUE', payload: value});
		return () => {};
	},
	updateStruct: struct => {
		store.dispatch({type: 'FOLDER_STRUCT', payload: struct});
		return () => {};
	},
	audioPaused: () => {
		store.dispatch({type: 'PLAY_MUSIC', payload: false});
		return () => {};
	},
	audioPlaying: () => {
		store.dispatch({type: 'PLAY_MUSIC', payload: true});
		return () => {};
	},
	getNextTrack: (baseFolderStruct, trackName) => {
		if (trackName == null) {
			return;
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
		if (trackName == null) {
			return;
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
		return () => {};
	},
	getCoverImage: path => {
		return async (dispatch, getState) => {
			try {
				const jsonPath = JSON.stringify({path: path});
				const url = Base64.encodeURI(jsonPath);
				const img = await fetch(`/radio/cover/${url}`, {
					method: 'post',
					headers: {
						Accept: 'application/json, text/plain, */*',
						'Content-Type': 'application/json',
					},
				})
					.then(res => res.json())
					.then(dataFromServer => {
						if (dataFromServer.sucsess === '1') {
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
};