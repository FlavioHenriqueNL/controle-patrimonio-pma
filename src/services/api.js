import axios from 'axios'; 
require('dotenv').config();
const api = axios.create({
  baseURL: "https://controlepatrimoniosms-backend.herokuapp.com/"
});

export default api;