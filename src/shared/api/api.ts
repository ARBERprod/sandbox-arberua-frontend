import axios from 'axios';

export const $api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
});

$api.interceptors.request.use(async (config) => config, (err) => Promise.reject(err));
