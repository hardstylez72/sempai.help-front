
const playerState = {
    play: false,
    pause: false,
    stop: false,
    nextTrack: '',
    prevTrack: '',
    nowPlayingName: '',
    nowPlayingURL: ''
};

 const playerReducer = (state = playerState, action) => {
    switch(action.type) {
        case 'PLAY_MUSIC':
            return {...state, play: action.payload}
        case 'STOP_MUSIC':
            return {...state, stop: action.payload}
        case 'PAUSE_MUSIC':
            return {...state, pause: action.payload}
        case 'GET_NEXT_TRACK':
            return {...state, nextTrack: action.payload}
        case 'GET_PREV_TRACK':
            return {...state, prevTrack: action.payload}
        case 'SONG_PLAYING_NAME':
            return {...state, nowPlayingName: action.payload}
        case 'SONG_PLAYING_URL':
            return {...state, nowPlayingURL: action.payload}
        default:
            return state;
    }
}


export {playerReducer, playerState};
