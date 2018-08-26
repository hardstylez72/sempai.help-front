
const playerState = {
    play: false,
    nextTrack: '',
    prevTrack: '',
    nowPlayingName: '',
    nowPlayingURL: '',
    cover: '',
    folderStruct: {},
    volume: 1,
    seekBarValue: 0,
    duration: 0,
    stats: {}
};

 const playerReducer = (state = playerState, action) => {
    switch(action.type) {
        case 'PLAY_MUSIC':
            return {...state, play: action.payload}
        case 'GET_NEXT_TRACK':
            return {...state, nextTrack: action.payload}
        case 'GET_PREV_TRACK':
            return {...state, prevTrack: action.payload}
        case 'SONG_PLAYING_NAME':
            return {...state, nowPlayingName: action.payload}
        case 'SONG_PLAYING_URL':
            return {...state, nowPlayingURL: action.payload}
        case 'COVER_IMAGE':
            return {...state, cover: action.payload}
        case 'FOLDER_STRUCT':
            return {...state, folderStruct: action.payload}
        case 'VOLUME':
            return {...state, volume: action.payload}
        case 'MUSIC_SEEKBAR_VALUE':
            return {...state, seekBarValue: action.payload}
        case 'DURATION':
            return {...state, duration: action.payload.duration, stats: action.payload.stats}
        default:
            return state;
    }
}


export {playerReducer, playerState};
