const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                userData: action.payload
            };
        case 'SET_ORGANIZATION_DATA':
            return {
                ...state,
                organizationDetails: action.payload
            };
        case 'SET_LOADER':
            return {
                ...state,
                loading: action.payload
            };
        case 'SET_ROUTE':
            return {
                ...state,
                route: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;
