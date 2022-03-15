import { useHistory } from 'react-router-dom';

import { ApiEndpoints } from '../apiEndpoints';
import config from '../config/config.json';
import httpRequest from './http';

// const LocalStorageService = (function () {
//     let _token = localStorage.getItem(config.LOCAL_STORAGE_TOKEN);

//     const saveTokenDataInLocalStorage = (token, expiryToken) => {
//         if (!token) {
//             return null;
//         }
//         const now = new Date();
//         const expiry = now.getTime() + expiryToken;
//         localStorage.setItem(config.LOCAL_STORAGE_TOKEN, token);
//         localStorage.setItem(config.LOCAL_STORAGE_EXPIRED_TOKEN, expiry);
//     };

//     const isValidToken = () => {
//         let expiry = localStorage.getItem(config.LOCAL_STORAGE_EXPIRED_TOKEN);
//         if (!expiry) {
//             return false;
//         }
//         return Date.now() <= expiry;
//     };

//     const handleRefreshToken = () => {
//         let UserId = Number(localStorage.getItem(config.LOCAL_STORAGE_USER_ID));
//         if (isValidToken()) {
//             return true;
//         } else if (_token && UserId) {
//             try {
//                 const data = handleRefreshTokenRequest(ApiEndpoints.REFRESH_TOCKEN, UserId);
//                 if (data && data.token !== undefined) {
//                     saveTokenDataInLocalStorage(data.token, data.expiresIn);
//                     return true;
//                 } else return false;
//             } catch (err) {
//                 return false;
//             }
//         } else return false;
//     };

//     const logOut = () => {
//         localStorage.clear();
//     };

//     const isAuthentication = () => {
//         let checkIsExpired = isValidToken();
//         if (!checkIsExpired && _token) {
//             return true;
//         } else return false;
//     };

//     return {
//         saveTokenDataInLocalStorage,
//         isValidToken,
//         handleRefreshToken,
//         logOut,
//         isAuthentication
//     };
// })();
// export default LocalStorageService;

export const handleRefreshToken = async () => {
    try {
        const userData = await httpRequest('POST', ApiEndpoints.REFRESH_TOKEN, false);
        if (userData) {
            localStorage.setItem(config.LOCAL_STORAGE_ALREADY_LIGGED_IN, userData.already_logged_in);
            localStorage.setItem(config.LOCAL_STORAGE_AVATAR_ID, userData.avatar_id);
            localStorage.setItem(config.LOCAL_STORAGE_CREATION_DATE, userData.creation_date);
            localStorage.setItem(config.LOCAL_STORAGE_TOKEN, userData.jwt);
            localStorage.setItem(config.LOCAL_STORAGE_EXPIRED_TOKEN, userData.expires_in);
            localStorage.setItem(config.LOCAL_STORAGE_USER_ID, userData.user_id);
            localStorage.setItem(config.LOCAL_STORAGE_USER_NAME, userData.user_Name);
            localStorage.setItem(config.LOCAL_STORAGE_USER_TYPE, userData.user_type);
        }
    } catch (ex) {
        await logout();
        await useHistory.pushState('/signin');
    }
};

export const logout = async () => {
    await httpRequest('POST', ApiEndpoints.LOGOUT);
    localStorage.clear();
};
