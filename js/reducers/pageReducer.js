
const pageReducer = (state = 'startScreen', action) => {
    switch (action.type) {
        case 'SHOW_PAGE':
            return action.page;

        case 'SHOW_NOTIFICATION':
            return pageReducer(state, {type: 'SHOW_PAGE', page: 'notification'});
        
        default:
            return state;
    }
};

export default pageReducer;
