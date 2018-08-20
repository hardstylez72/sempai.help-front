import store from '../rootStore';
import {Base64} from 'js-base64';
export const playerActions = {

    PLAY_MUSIC: 'PLAY_MUSIC',
    STOP_MUSIC: 'STOP_MUSIC',
    PAUSE_MUSIC: 'PAUSE_MUSIC',
    GET_NEXT_TRACK: 'GET_NEXT_TRACK',
    GET_PREV_TRACK: 'GET_PREV_TRACK',
    SONG_PLAYING_NAME: 'SONG_PLAYING_NAME',
    SONG_PLAYING_URL: 'SONG_PLAYING_URL',

    audioPaused: () => {
        store.dispatch({type: 'PLAY_MUSIC', payload: false});
        store.dispatch({type: 'PAUSE_MUSIC', payload: true});
    },
    audioPlaying: () => {
        store.dispatch({type: 'PLAY_MUSIC', payload: true});
        store.dispatch({type: 'PAUSE_MUSIC', payload: false});
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
            await(function searchInTree(node) {
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
                            return Promise.resolve(el);
                            
                        }
                        if (el.name === trackName) {
                            isPlayingTrackFound = true;
                        }
                        searchInTree(el);
                    }
                }
            })(baseNode);
            
        })()
         return () => {
            return Promise.resolve(nextTrack);
         }  
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
            await(function searchInTree(node) {
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
                            return Promise.resolve(el);
                            
                        }
                        if (el.name === trackName) {
                            isPlayingTrackFound = true;
                        }
                        searchInTree(el);
                    }
                }
            })(baseNode);
            
        })()
         return () => {
            return Promise.resolve(nextTrack);
         }  
    },
    playThisSong: (name, path) => {
        const jsonPath = JSON.stringify({path: path});
        const url = Base64.encodeURI(jsonPath);
        store.dispatch({type: 'SONG_PLAYING_NAME', payload: name});
        store.dispatch({type: 'SONG_PLAYING_URL', payload: url});
        return () => {};
    }
}

