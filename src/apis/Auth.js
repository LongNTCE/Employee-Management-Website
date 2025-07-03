import axios from 'axios';

const API_ENDPOINT = 'http://localhost:8000/'

export const login = async (username, password) => {
  try {
    
    const response = await axios.post(API_ENDPOINT + 'auth/login', {
      username,
      password,
    });
    console.log(response)
    return response;
  } catch (error) {
    throw new Error('Login failed: ' + error.response.data.message);
  }
};

// export const register = async (userData) => {
//   const response = await axios.post('/api/register', userData);
//   return response.data;
// };
