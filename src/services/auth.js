
import config from '../config/config.json'
import { handleRefreshTokenRequest } from './http'
import { ApiEndpoint } from '../apiEndpoints'


const LocalStorageService = (function () {

    let _token = localStorage.getItem(config.LOCAL_STORAGE_TOKEN);

    const saveTokenDataInLocalStorage = (token, expiryToken) => {
        if (!token) {
            return null;
        }
        const now = new Date()
        const expiry = now.getTime() + expiryToken;
        localStorage.setItem(config.LOCAL_STORAGE_TOKEN, token)
        localStorage.setItem(config.LOCAL_STORAGE_EXPIRED_TOKEN, expiry)
    }

    const isValidToken = () => {
        let expiry = localStorage.getItem(config.LOCAL_STORAGE_EXPIRED_TOKEN)
        if (!expiry) {
            return false;
        }
        return Date.now() <= expiry;
    };

    const handleRefreshToken = () => {
        let UserId = Number(localStorage.getItem(config.LOCAL_STORAGE_USER_ID))
        if (isValidToken()) {
            return true;
        }
        else if (_token && UserId) {
            try {
                const data = handleRefreshTokenRequest(ApiEndpoint.REFRESH_TOCKEN, UserId);
                if (data && data.token !== undefined) {
                    saveTokenDataInLocalStorage(data.token, data.expiresIn);
                    return true;
                }
                else
                    return false;
            }
            catch (err) {
                return false;

            }
        }
        else
            return false
    };

    const logOut = () => {
        localStorage.clear();
    }

    const isAuthentication = () => {
        let checkIsExpired = isValidToken();
        if (!checkIsExpired && _token) {
            return true;
        }
        else
            return false
    };

    return {
        saveTokenDataInLocalStorage,
        isValidToken,
        handleRefreshToken,
        logOut,
        isAuthentication,
    }
})();
export default LocalStorageService;