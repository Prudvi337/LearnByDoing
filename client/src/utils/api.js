// src/utils/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchProjects = async () => {
  const response = await API.get('/projects');
  return response.data;
};
