
const playerState = {
    play          : false,
    nextTrack     : '',
    prevTrack     : '',
    nowPlayingName: '',
    nowPlayingURL : '',
    cover         : '',
    folderStruct  : {},
    favorite      : [],
    uploaded      : [],
    volume        : 1,
    seekBarValue  : 0,
    duration      : 0,
    isSeeking     : false,
    trackInfo     : {},
};

const playerReducer = (state = playerState, action) => {
    switch (action.type) {
    case 'TRACK_INFO':
        return {
            ...state,
            trackInfo: action.payload,
        };
    case 'PLAY_MUSIC':
        return {
            ...state,
            play: action.payload,
        };
    case 'GET_NEXT_TRACK':
        return {
            ...state,
            nextTrack: action.payload,
        };
    case 'GET_PREV_TRACK':
        return {
            ...state,
            prevTrack: action.payload,
        };
    case 'SONG_PLAYING_NAME':
        return {
            ...state,
            nowPlayingName: action.payload,
        };
    case 'SONG_PLAYING_URL':
        return {
            ...state,
            nowPlayingURL: action.payload,
        };
    case 'COVER_IMAGE':
        return {
            ...state,
            cover: action.payload,
        };
    case 'FOLDER_STRUCT':
        return {
            ...state,
            folderStruct: action.payload,
        };
    case 'FAVORITE_STRUCT':
        return {
            ...state,
            favorite: action.payload,
        };
    case 'ADD_TO_FAVORITE_STRUCT':
        state.favorite.push(action.payload);

        return { ...state, };
    case 'UPLOADED_STRUCT':
        return {
            ...state,
            uploaded: action.payload,
        };
    case 'VOLUME':
        return {
            ...state,
            volume: action.payload,
        };
    case 'MUSIC_SEEKBAR_VALUE':
        return {
            ...state,
            seekBarValue: action.payload,
        };
    case 'DURATION':
        return {
            ...state,
            duration: action.payload,
        };
    case 'IS_SEEKING':
        return {
            ...state,
            isSeeking: action.payload,
        };
    default:
        return state;
    }
};


export { playerReducer, playerState, };
