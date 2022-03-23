import { message } from 'antd';
import axios from 'axios';

import { SERVER_URL, SHOWABLE_ERROR_STATUS_CODE } from '../config';
import { LOCAL_STORAGE_TOKEN } from '../const/localStorageConsts.js';
import pathContainers from '../router';
import { handleRefreshToken, isValidToken } from './auth';

export async function httpRequest(method, endPointUrl, data = {}, headers = {}, queryParams = {}, authNeeded = true, timeout = 0) {
    const url = window.location.href;
    if (url.indexOf('login') === -1 && !isValidToken()) {
        handleRefreshToken();
    }
    if (authNeeded) {
        const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
        headers['Authorization'] = 'Bearer ' + token;
    }
    const HTTP = axios.create({
        withCredentials: true
    });
    if (method !== 'GET' && method !== 'POST' && method !== 'PUT' && method !== 'DELETE')
        throw {
            status: 400,
            message: `Invalid HTTP method`,
            data: { method, endPointUrl, data }
        };
    try {
        const url = `${SERVER_URL}${endPointUrl}`;
        const res = await HTTP({
            method,
            url,
            data,
            headers,
            timeout,
            params: queryParams
        });
        const results = res.data;
        return results;
    } catch (err) {
        if (err?.response?.status === 401) {
            localStorage.clear();
            window.location.replace(pathContainers.login);
        }
        if (err?.response?.data?.message !== undefined && err?.response?.status === SHOWABLE_ERROR_STATUS_CODE) {
            message.error({
                key: 'strechErrorMessage',
                content: err?.response?.data?.message,
                duration: 3,
                style: { cursor: 'pointer' },
                onClick: () => message.destroy('strechErrorMessage')
            });
        }
        throw err.response;
    }
}
