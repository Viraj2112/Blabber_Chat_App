import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5174/api/" : "/api/", //this is the base url for the backend. We use this to make requests to the backend.
    withCredentials: true,  //we use this because we have to send cookies of each request. To allow the backend to access the jwt token.
});