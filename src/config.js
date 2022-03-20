const environment = process.env.REACT_APP_ENV ? process.env.REACT_APP_ENV : 'DEV';
const SERVER_URL_PRODUCTION = `${window.location.href.split('//')[1].split('/')[0]}/api-gw`;

export const SERVER_URL = environment === 'production' ? SERVER_URL_PRODUCTION : 'http://localhost:5555';
export const INTERVAL = 7000;
export const SHOWABLE_ERROR_STATUS_CODE = 666;
