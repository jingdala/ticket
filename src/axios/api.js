import axios from "./request.js"

import QS from 'qs';

axios.defaults.baseURL = '/api';

export const userlogin = (params) => {
  return axios.post('/SystemUserLogin/UserLogin?' + QS.stringify(params))
}