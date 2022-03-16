import { message } from 'antd';
import axios from 'axios';

import { SERVER_URL, SHOWABLE_ERROR_STATUS_CODE } from '../config';
import { LOCAL_STORAGE_TOKEN } from '../const/localStorageConsts.js';

export async function httpRequest(method, endPointUrl, data = {}, headers = {}, queryParams = {}, authNeeded = true, timeout = 0) {
    debugger;
    if (authNeeded) {
        const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
        headers['Authorization'] = 'Bearer ' + token;
    }
    const HTTP = axios.create({
        withCredentials: true,
        headers: {
            'Access-Control-Expose-Headers': 'X-My-Custom-Header X-Another-Custom-Header',
            'Access-Control-Allow-Origin': '*'
        }
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
