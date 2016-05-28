
const stepReducer = (state = 0, action) => {
    switch (action.type) {
        case 'SET_STEP':
            return action.step;
        
        case 'NEXT_STEP':
            return state + 1;
        
        default:
            return state;
    }
};

export default stepReducer;
