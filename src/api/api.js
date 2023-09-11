import axios from 'axios';

// const accessToken = localStorage.getItem('access_token');
const api = axios.create({
    // baseURL: 'https://lensys.in/server/',
    baseURL: 'https://techmatrick.com/lensys/',
    // headers: {
    //     common: {
    //         'Content-Type': 'application/json',
    //         ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
    //     }
    // }
});


export default api;
