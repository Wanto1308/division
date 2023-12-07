import axios from 'axios';
import { clearStorages, getToken } from '../utils/storage';

const BASE_URL = 'https://test.saranatechnology.com';
const Authorization = `Bearer ${getToken()}`;

const fetch = (url, method, param1, param2) => new Promise((resolve, reject) => {
  axios[method](url, param1, param2)
    .then(res => resolve(res.data))
    .catch(err => {
      const defaultError = {
        code: 500,
        status: 'error',
        message: 'Failed to fetch data. Please contact developer.'
      };

      if (!err.response) {
        reject(defaultError);
      } else if (!err.response.data) {
        reject(defaultError);
      } else if (err.response.status === 401) {
        clearStorages();
        location.href = '/';
      } else { reject(err.response.data); }
    });
});

export const login = async data => (
  fetch(`${BASE_URL}/api/v1/login`, 'post', data)
);

export const logout = () => (
  fetch(`${BASE_URL}/v1/logout`, 'delete', { headers: { Authorization } })
);

export const userData = async (auth) => (
  fetch(`${BASE_URL}/api/v1/auth`, 'get', { headers: { Authorization: auth } })
);

export const allDivision = (params) => (
  fetch(`${BASE_URL}/api/v1/division`, 'get', { headers: { Authorization }, params })
);

export const submitDivision = (data) => (
  fetch(`${BASE_URL}/api/v1/division`, 'post', data, { headers: { Authorization } })
);

export const updateDivision = (data, id) => (
  fetch(`${BASE_URL}/api/v1/division/${id}`, 'put', data, { headers: { Authorization } })
);

export const deleteDivision = (id) => (
  fetch(`${BASE_URL}/api/v1/division/${id}`, 'delete', { headers: { Authorization } })
);
