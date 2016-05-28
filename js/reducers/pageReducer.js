
const pageReducer = (state = 'startScreen', action) => {
    switch (action.type) {
        case 'SHOW_PAGE':
            return action.page;

        default:
            return state;
    }
};

export default pageReducer;
