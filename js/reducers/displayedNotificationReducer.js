
const displayedNotificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return action.notification;
        
        default:
            return state;
    }
};

export default displayedNotificationReducer;
