const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                userData: action.payload
            };
        case 'SET_COMPANY_LOGO':
            return {
                ...state,
                companyLogo: action.payload
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
        case 'SET_AUTHENTICATION':
            return {
                ...state,
                isAuthentication: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;
