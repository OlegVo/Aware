
const defaultSettings = {
    perDay: 5,
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
};

const stepReducer = (state = defaultSettings, action) => {
    switch (action.type) {

        default:
            return state;
    }
};

export default stepReducer;
