import axios from 'axios';

const FORGOT_API = axios.create({
  baseURL: 'http://localhost:8080/forgotPassword', // Không có /api/auth
  headers: {
    'Content-Type': 'application/json',
  },
});

export default FORGOT_API;