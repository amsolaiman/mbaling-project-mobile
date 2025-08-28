import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_HOST_API,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

export const API_ENDPOINTS = {
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
  },
  student: {
    housing: (id: string) => `/api/student/list/${id}/housing`,
    application: (id: string) => `/api/student/list/${id}/application`,
  },
  post: {
    list: '/api/post/list',
    search: (query: string) => `/api/post/search?query=${query}`,
  },
};
