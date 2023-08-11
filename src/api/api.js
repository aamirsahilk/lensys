import axios from 'axios';

// const accessToken = localStorage.getItem('access_token');
// console.log("auth", accessToken);
const api = axios.create({
    baseURL: 'https://techmatrick.com/lensys/',
    // headers: {
    //     common: {
    //         'Content-Type': 'application/json',
    //         ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
    //     }
    // }
});


export default api;
