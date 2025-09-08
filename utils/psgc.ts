import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_PSGC_API,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

export const API_ENDPOINTS = {
  region: {
    list: '/api/regions',
    get: (code: string) => `/api/regions/${code}`,
    getSub: (code: string) => `/api/regions/${code}/provinces`,
  },
  province: {
    list: '/api/provinces',
    get: (code: string) => `/api/provinces/${code}`,
    getSub: (code: string) => `/api/provinces/${code}/cities-municipalities`,
  },
  cityMunicipality: {
    list: '/api/cities-municipalities',
    get: (code: string) => `/api/cities-municipalities/${code}`,
    getSub: (code: string) => `/api/cities-municipalities/${code}/barangays`,
  },
  barangay: {
    list: '/api/barangays',
    get: (code: string) => `/api/barangays/${code}`,
  },
};
