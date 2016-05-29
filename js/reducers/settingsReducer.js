
const defaultSettings = {
    perDay: 5,
    daysOfWeek: [0, 1, 2, 3, 4],
    isSoundNotify: false,
};

const settingsReducer = (state = defaultSettings, action) => {
    switch (action.type) {
        case 'SET_SOUND_NOTIFICATION':
            return {
                ...state,
                isSoundNotify: !state.isSoundNotify,
            }

        default:
            return state;
    }
};

export default settingsReducer;
