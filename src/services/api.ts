import axios from 'axios';

const api = axios.create({
  baseURL: 'https://5efe4ad9dd373900160b40e1.mockapi.io/desafioAmbev/',
});

export default api;
