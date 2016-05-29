
// const testNotification = {
//     shortText: 'Есть ли у вас напряжение в руках прямо сейчас?',
//     text: 'Если есть напряжение, слегка встряхните руки, расслабьте мышцы. Постоянно направляя внимание внутрь вы все лучше и лучше будете управлять своими эмоциями.'
// };

const displayedNotificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return action.notification;
        
        default:
            return state;
    }
};

export default displayedNotificationReducer;
