import axios from 'axios'

const token = localStorage.getItem('chat_access_token'); 
const config = axios.create({
    // baseURL: process.env.REACT_APP_BACKEND_BASE_URL
    baseURL:"http://localhost:4200/routes"
})
config.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default config;