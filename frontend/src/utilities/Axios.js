import axios from 'axios';
import ENV from './environment';

const BASE_URL = ENV.apiURL;

const Axios = axios.create({
    baseURL: BASE_URL,
});

export default Axios;
