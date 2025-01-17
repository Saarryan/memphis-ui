const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'DEV';
const SERVER_URL_PRODUCTION = `${window.location.href.split('//')[1].split('/')[0]}/api-gw`;

export const SERVER_URL = environment === 'production' ? `https://${SERVER_URL_PRODUCTION}` : 'http://localhost:5555/api-gw';
export const HANDLE_REFRESH_INTERVAL = 870000;
export const SHOWABLE_ERROR_STATUS_CODE = 666;
