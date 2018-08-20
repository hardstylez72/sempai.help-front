
const playerState = {
    media: {}
};

 const playerReducer = (state = playerState, action) => {
    switch(action.type) {
        case 'CHANGE_NAME':
            return {...state, name: action.payload}
        case 'CHANGE_LAST_NAME':
            return {...state, lastName: action.payload}
        default:
            return state;
    }
}


export {playerReducer, playerState};
