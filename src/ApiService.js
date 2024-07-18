import axios from 'axios';
import Cookies from 'js-cookie';
//import { useNavigate } from 'react-router-dom';

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



/* axiosInstance.interceptors.response.use(
  response => response,
  error => {
      if (error.response) {
          if (error.response.status === 401) {
              // Token is expired or invalid
              Cookies.remove('token');
              window.location.href = '/login';
          } else if (error.response.status === 404) {
              // Redirect to the 404 page
              window.location.href = '/404';
          }
      }
      return Promise.reject(error);
  }
); */

axiosInstance.interceptors.response.use(
  response => response,
  error => {
      const isLoginPage = window.location.pathname === '/login' || window.location.pathname === '/login-admin';
      
      if (error.response) {
          if (error.response.status === 401) {
            if(!isLoginPage){
              Cookies.remove('token');
              Cookies.remove('role');
              //navigate('/login');
              window.location.href = "/login"
            }else{
              Cookies.remove('token');
              Cookies.remove('role');
            }
          } else if (error.response.status === 404) {
              // Redirect to the 404 page
              //navigate('/404');
              window.location.href = "/404"
          }
      }
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

export const fetchRoles = async (limit, page) => {
  try {
    const response = await axiosInstance.get(`/v1/admin/roles?limit=${limit}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching admins:', error);
    throw error;
  }
};



export default axiosInstance;
