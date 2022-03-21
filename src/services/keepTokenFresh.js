import { LOCAL_STORAGE_TOKEN } from '../const/localStorageConsts';
import pathContainers from '../router';
import { handleRefreshToken } from './auth';

export async function keepTokenFresh(expires_in) {
    const safety_seconds = 20000; // 20 seconds
    setTimeout(() => {
        if (localStorage.getItem(LOCAL_STORAGE_TOKEN)) {
            handleRefreshToken();
        } else {
            window.location.replace(pathContainers.login);
        }
    }, expires_in - safety_seconds);
}
