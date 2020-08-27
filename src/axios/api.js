import axios from './request.js';
import QS from 'qs';

axios.defaults.baseURL = '/api';


export const userlogin = (params) => {
  return axios.post('/SystemManager/GetUserToken?' + QS.stringify(params))
}
