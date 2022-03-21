import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { httpRequest } from '../services/http';
import { ApiEndpoints } from '../const/apiEndpoints';
import {
    LOCAL_STORAGE_ALREADY_LIGGED_IN,
    LOCAL_STORAGE_AVATAR_ID,
    LOCAL_STORAGE_CREATION_DATE,
    LOCAL_STORAGE_TOKEN,
    LOCAL_STORAGE_EXPIRED_TOKEN,
    LOCAL_STORAGE_USER_ID,
    LOCAL_STORAGE_USER_NAME,
    LOCAL_STORAGE_USER_TYPE,
    LOCAL_STORAGE_KEEP_ME_SIGN_IN
} from '../const/localStorageConsts';
import { handleRefreshToken } from '../services/auth';
import pathContainers from '../router';

export default function useAuth() {
    let history = useHistory();
    const [error, setError] = useState(null);

    const keepTokenFresh = (expires_in) => {
        const safety_seconds = 20000; // 20 seconds
        setTimeout(async () => {
            if (localStorage.getItem(LOCAL_STORAGE_TOKEN)) {
                await handleRefreshToken();
                keepTokenFresh(expires_in);
            }
        }, expires_in - safety_seconds);
    };

    const saveToLocalStorage = (userData, isKeepMeSignin) => {
        const now = new Date();
        const expiry_token = now.getTime() + userData.expires_in;

        localStorage.setItem(LOCAL_STORAGE_ALREADY_LIGGED_IN, userData.already_logged_in);
        localStorage.setItem(LOCAL_STORAGE_AVATAR_ID, userData.avatar_id);
        localStorage.setItem(LOCAL_STORAGE_CREATION_DATE, userData.creation_date);
        localStorage.setItem(LOCAL_STORAGE_TOKEN, userData.jwt);
        localStorage.setItem(LOCAL_STORAGE_USER_ID, userData.user_id);
        localStorage.setItem(LOCAL_STORAGE_USER_NAME, userData.user_Name);
        localStorage.setItem(LOCAL_STORAGE_USER_TYPE, userData.user_type);
        localStorage.setItem(LOCAL_STORAGE_KEEP_ME_SIGN_IN, isKeepMeSignin);
        localStorage.setItem(LOCAL_STORAGE_EXPIRED_TOKEN, expiry_token);
    };

    const isValidToken = () => {
        const tokenExpiryTime = localStorage.getItem(LOCAL_STORAGE_EXPIRED_TOKEN);
        if (Date.now() <= tokenExpiryTime) {
            return true;
        } else {
            return false;
        }
    };

    const loginUser = async (data, isKeepMeSignin) => {
        const { username, password } = data;
        try {
            const data = await httpRequest('POST', ApiEndpoints.LOGIN, { username, password }, {}, {}, false);
            if (data) {
                saveToLocalStorage(data, isKeepMeSignin);
                history.push('/overview');
                await keepTokenFresh(data.expires_in);
                return data;
            }
        } catch (err) {
            setError(err);
        }
    };

    return {
        loginUser,
        isValidToken,
        error
    };
}
