import axios from 'axios';

const { VITE_BACK_URL } = import.meta.env;

const BASE_URL = VITE_BACK_URL || 'http://localhost:3333';

const authenticate = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/authenticate`, { username, password });
    return response;
  } catch (error) {
    return error;
  }
};

export default authenticate;
