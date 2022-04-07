import React, { createContext, useReducer } from 'react';

import Reducer from './reducer';

const initialState = {
    userData: {
        user_id: '',
        already_logged_in: false,
        creation_date: '',
        user_type: '',
        avatar_id: 1
    },
    companyLogo: '',
    loading: false,
    error: null,
    route: '',
    isAuthentication: false
};

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
};

export const Context = createContext(initialState);
export default Store;
