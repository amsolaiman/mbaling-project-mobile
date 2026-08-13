import axios from 'axios';

// ----------------------------------------------------------------------

// eslint-disable-next-line import/no-named-as-default-member
const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_HOST_API,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    )
);

export default axiosInstance;

export const API_ENDPOINTS = {
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
  },
  landlord: {
    tenants: (id: string) => `/api/landlord/list/${id}/tenants`,
    applicants: (id: string) => `/api/landlord/list/${id}/applicants`,
  },
  student: {
    housing: (id: string) => `/api/student/list/${id}/housing`,
    application: (id: string) => `/api/student/list/${id}/application`,
  },
  post: {
    list: '/api/post/list?createdBy=true',
    user: (id: string) => `/api/post/user?id=${id}&createdBy=true`,
    search: (query: string) => `/api/post/search?query=${query}&createdBy=true`,
  },
};
