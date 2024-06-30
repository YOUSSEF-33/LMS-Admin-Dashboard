import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'https://bnu-api-staging.knownlege.com/api/';

// Set up default config for axios
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add a request interceptor to include the token in the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Admin login API call
export const adminLogin = async (email, password) => {
  try {
    const response = await axiosInstance.post('v1/admins/login', { email, password });
    return response;
  } catch (error) {
    if (error.response && (error.response.status === 422 || error.response.status === 401)) {
      throw new Error(error.response.data.message);
    }
    console.error('Error logging in:', error);
    throw error;
  }
};

export const fetchAdminData = async (token) => {
  try {
    const response = await axiosInstance.get('v1/admins/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching admin data:', error);
    throw error;
  }
};

// Fetch admins with pagination API call
export const fetchAdmins = async (limit, page) => {
  try {
    const response = await axiosInstance.get(`/v1/admins?limit=${limit}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching admins:', error);
    throw error;
  }
};

axiosInstance.interceptors.response.use(
  response => response,
  error => {
      if (error.response && error.response.status === 401) {
          // Token is expired or invalid
          Cookies.remove('token');
          window.location.href = '/login';
      }
      return Promise.reject(error);
  }
);

export default axiosInstance;
