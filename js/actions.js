
export const toggleCategory = (category) => {
    return {
        type: 'TOGGLE_CATEGORY',
        category
    };
};

export const showPage = (page) => {
    return {
        type: 'SHOW_PAGE',
        page
    };
};

export const setStep = (step) => {
    return {
        type: 'SET_STEP',
        step
    };
};

export const nextStep = () => {
    return {
        type: 'NEXT_STEP',
    };
};

export const showNotification = (notification) => {
    return {
        type: 'SHOW_NOTIFICATION',
        notification
    };
};

export const setSoundNotification = (status) => {
    return {
        type: 'SET_SOUND_NOTIFICATION',
    };
};
