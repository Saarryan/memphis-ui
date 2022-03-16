import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Context } from './store';
import { httpRequest } from '../services/http';
import { ApiEndpoints } from '../const/apiEndpoints';

export default function useAuth() {
    let history = useHistory();
    const [state, dispatch] = useContext(Context);
    const [error, setError] = useState(null);

    const loginUser = async (data, isKeepMeSignin) => {
        debugger;
        const { username, password } = data;

        try {
            const data = await httpRequest('POST', ApiEndpoints.LOGIN, { username, password }, {}, {}, false);
            if (data) {
                debugger;
                dispatch({ type: 'SET_USER_DATA', payload: true });
                history.push('/home');
            }
        } catch (err) {
            setError(err);
        }
    };

    return {
        loginUser,
        error
    };
}
