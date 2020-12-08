import axios from 'axios'; 
require('dotenv').config();
const api = axios.create({
  // baseURL: "http://localhost:3333/"
  baseURL: "https://controlepatrimoniosms-backend.herokuapp.com/"
});

export default api;