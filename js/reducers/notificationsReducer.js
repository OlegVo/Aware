
const notifications = [
    {
        shortText: 'Есть ли у вас какие-либо ощущения в области горла?',
        text: 'Дополнительный текст'
    },
    {shortText: 'Что вы чувствуете в области груди прямо сейчас? Дискомфорт, расслабление?'},
    {shortText: 'Обратите внимание на мышцы лица. Они напряжены или расслаблены?'},
    {shortText: 'Какой ритм вашего дыхания прямо сейчас? Частый или наоборот глубокий?'},
];

const notificationsReducer = (state = notifications, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default notificationsReducer;
