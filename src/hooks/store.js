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
    stationDetails: {
        name: 'temporary name',
        retention: '3 days',
        max_throughput: '1500s',
        status: 'healthy',
        awaiting_messages: 10,
        average_message_size: 15,
        memory: 50,
        cpu: 20,
        storage: 15,
        functions: [
            {
                _id: 1,
                name: 'sveta',
                type: 'blabl'
            },
            {
                _id: 2,
                name: 'sveta2',
                type: 'blabl'
            },
            {
                _id: 3,
                name: 'sveta3',
                type: 'blabl'
            }
        ]
    },
    loading: false,
    error: null,
    route: ''
};

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
};

export const Context = createContext(initialState);
export default Store;
