
const favoriteState = {
    isAdded   : false,
    processing: false,
};

const FavoriteReducer = (state = favoriteState, action) => {
    switch (action.type) {
    case 'FAVORITES_STATE':
        return {
            ...state,
            processing: action.payload.processing,
            isAdded   : action.payload.isAdded,
        };
    default:
        return state;
    }
};


export { FavoriteReducer, };
