import axios from 'axios';

const API_BASE_URL = 'https://bnu-api-staging.knownlege.com/api/';

// Set up default config for axios
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Admin login API call
export const adminLogin = async (email, password) => {
  try {
    const response = await axiosInstance.post('v1/admins/login', { email, password });
    return response;
  } catch (error) {
    if (error.response && error.response.status === 422 || error.response.status === 401) {
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
