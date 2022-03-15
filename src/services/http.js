import { message } from 'antd';
import axios from 'axios';

import LocalStorageService from '../services/auth';
import config from '../config/config.json';

let { SERVER_URL_STAGING } = config;
const SERVER_URL_PRODUCTION = `${window.location.href.split('//')[1].split('/')[0]}/api-gw`;
const SERVER_URL = process.env.REACT_APP_ENV === 'production' ? SERVER_URL_PRODUCTION : SERVER_URL_STAGING;

export async function httpRequest(method, endPointUrl, authNeeded = true, data = {}, headers = {}, queryParams = {}, timeout = 0) {
    if (authNeeded) {
        const token = localStorage.getItem(config.LOCAL_STORAGE_TOKEN);
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
        if (err?.response?.data?.message !== undefined && err?.response?.status === config.SHOWABLE_ERROR_STATUS_CODE) {
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
