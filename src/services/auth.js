import { useHistory } from 'react-router-dom';

import { ApiEndpoints } from '../const/apiEndpoints';
import {
    LOCAL_STORAGE_ALREADY_LIGGED_IN,
    LOCAL_STORAGE_AVATAR_ID,
    LOCAL_STORAGE_CREATION_DATE,
    LOCAL_STORAGE_TOKEN,
    LOCAL_STORAGE_EXPIRED_TOKEN,
    LOCAL_STORAGE_USER_ID,
    LOCAL_STORAGE_USER_NAME,
    LOCAL_STORAGE_USER_TYPE
} from '../const/localStorageConsts';
import pathContainers from '../router';
import { httpRequest } from './http';
import { keepTokenFresh } from './keepTokenFresh';

export const handleRefreshToken = async () => {
    try {
        const userData = await httpRequest('POST', ApiEndpoints.REFRESH_TOCKEN, {}, {}, false);
        if (userData) {
            const now = new Date();
            const expiry_token = now.getTime() + userData.expires_in;

            localStorage.setItem(LOCAL_STORAGE_ALREADY_LIGGED_IN, userData.already_logged_in);
            localStorage.setItem(LOCAL_STORAGE_AVATAR_ID, userData.avatar_id);
            localStorage.setItem(LOCAL_STORAGE_CREATION_DATE, userData.creation_date);
            localStorage.setItem(LOCAL_STORAGE_TOKEN, userData.jwt);
            localStorage.setItem(LOCAL_STORAGE_USER_ID, userData.user_id);
            localStorage.setItem(LOCAL_STORAGE_USER_NAME, userData.user_Name);
            localStorage.setItem(LOCAL_STORAGE_USER_TYPE, userData.user_type);
            localStorage.setItem(LOCAL_STORAGE_EXPIRED_TOKEN, expiry_token);
            await keepTokenFresh(userData.expires_in);
        }
    } catch (ex) {
        await logout();
    }
};

export const logout = async () => {
    if (localStorage.LOCAL_STORAGE_TOKEN) {
        await httpRequest('POST', ApiEndpoints.LOGOUT);
    }
    localStorage.clear();
    window.location.replace(pathContainers.login);
};
