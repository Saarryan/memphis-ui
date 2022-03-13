import axios from 'axios'
import config from '../config/config.json'
import LocalStorageService from "../services/auth";
import { message } from "antd";

let { SERVER_URL_STAGING, SERVER_URL_PRODUCTION } = config;
const SERVER_URL = process.env.REACT_APP_ENV === 'production' ? SERVER_URL_PRODUCTION : SERVER_URL_STAGING;

export async function httpRequest(method, endPointUrl, data = {}, headers = {}, queryParams = {}, timeout = 0) {

  const url = window.location.href;
  if (url.indexOf("verifyemail") === -1 || url.indexOf("signin") === -1) {
    LocalStorageService.handleRefreshToken();
  }
  const token = localStorage.getItem(config.LOCAL_STORAGE_TOKEN)
  const HTTP = axios.create({
    withCredentials: true,
    headers: {
      'Authorization': 'Bearer ' + token,
      "Access-Control-Expose-Headers": "X-My-Custom-Header X-Another-Custom-Header",
      "Access-Control-Allow-Origin": "*",
      "Accept-Language": localStorage.getItem(config.LOCAL_STORAGE_LANGUAGE)
    }
  })
  if (method !== 'GET' && method !== 'POST' && method !== 'PUT' && method !== 'DELETE')
    throw {
      status: 400,
      message: `Invalid HTTP method`,
      data: { method, endPointUrl, data }
    };
  try {
    const url = endPointUrl;
    const res = await HTTP({
      method,
      url,
      data,
      headers,
      timeout,
      params: queryParams,
    })
    const results = res.data;
    return results
  } catch (err) {
    if (err?.response?.data?.message !== undefined && err?.response?.status === config.SHOWABLE_ERROR_STATUS_CODE) {

      message.error({
        key: 'strechErrorMessage',
        content: err?.response?.data?.message,
        duration: 3,
        style: { 'cursor': "pointer" },
        onClick: (() => message.destroy('strechErrorMessage'))
      });
    }
    throw (err.response)
  }
}

export async function handleRefreshTokenRequest(endPointUrl, UserId) {
  const HTTP = axios.create({
    withCredentials: true,
    headers: {
      "Access-Control-Expose-Headers": "X-My-Custom-Header X-Another-Custom-Header"
    }
  })
  try {
    const url = `${SERVER_URL}${endPointUrl}`;
    const method = "POST";
    const data = { userId: UserId }
    const res = await HTTP({ method, url, data })
    const results = res.data;
    return results
  } catch (err) {
    throw (err.response)
  }
}