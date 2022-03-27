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

export const saveToLocalStorage = (userData) => {
    const now = new Date();
    const expiryToken = now.getTime() + userData.expires_in;

    localStorage.setItem(LOCAL_STORAGE_ALREADY_LIGGED_IN, userData.already_logged_in);
    localStorage.setItem(LOCAL_STORAGE_AVATAR_ID, userData.avatar_id);
    localStorage.setItem(LOCAL_STORAGE_CREATION_DATE, userData.creation_date);
    localStorage.setItem(LOCAL_STORAGE_TOKEN, userData.jwt);
    localStorage.setItem(LOCAL_STORAGE_USER_ID, userData.user_id);
    localStorage.setItem(LOCAL_STORAGE_USER_NAME, userData.username);
    localStorage.setItem(LOCAL_STORAGE_USER_TYPE, userData.user_type);
    localStorage.setItem(LOCAL_STORAGE_EXPIRED_TOKEN, expiryToken);
};

export const logout = async () => {
    if (localStorage.getItem(LOCAL_STORAGE_TOKEN)) {
        await httpRequest('POST', ApiEndpoints.LOGOUT);
    }
    localStorage.clear();
    window.location.assign(pathContainers.login);
};

export const isValidToken = () => {
    const tokenExpiryTime = localStorage.getItem(LOCAL_STORAGE_EXPIRED_TOKEN);
    if (Date.now() <= tokenExpiryTime) {
        return true;
    } else {
        return false;
    }
};
