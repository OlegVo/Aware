
const categories = {
    selected: [],
    other: [
        {text: 'Управление гневом'},
        {text: 'Устранение тревоги'},
        {text: 'Преодоление страхов'},
        {text: 'Снижение раздражения'},
    ]
};

const categoriesReducer = (state = categories, action) => {
    switch (action.type) {
        case 'TOGGLE_CATEGORY':
            const { category } = action;
            const isSelected = (_.find(state.selected, category));

            if (isSelected ) {
                return {
                    ...state,
                    selected: _.without(state.selected, category),
                    other: _.union(state.other, [category]),
                };
            }

            return {
                ...state,
                selected: _.union(state.selected, [category]),
                other: _.without(state.other, category),
            };

        default:
            return state;
    }
};

export default categoriesReducer;
