import axios from 'axios';
import {BehaviorSubject} from 'rxjs';
import history from './history';


const currentUserSubject = new BehaviorSubject(
  localStorage.getItem('travellingUser'),
);

const api = axios.create({
  baseURL: process?.env?.REACT_APP_BASE_URL || 'http://travelingbetapi-env.eba-2riiwc2y.us-east-1.elasticbeanstalk.com/api/',
});

api.interceptors.request.use(async (config: any) => {
  const userToken = await localStorage.getItem('travellingToken');
  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }

  return config;
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    if (err?.response?.status === 401 || err?.response === undefined) {
      localStorage.removeItem('travellingUser');
      localStorage.removeItem('travellingToken');
      localStorage.removeItem('travellingUsuarioId');
      localStorage.removeItem('travellingRole');
      currentUserSubject.next(null);
      history.push('/');
    }
    return Promise.reject(err);
  },
);

export default api;
