import axios from "axios";
import { BASEAPI } from "./apis";

const api = axios.create({
    baseURL: BASEAPI,
    headers: {
        "Content-Type": "application/json"
    }
})
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    console.log(token, 'token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => Promise.reject(error))

api.interceptors.response.use((config) => {
    const token = localStorage.getItem("token");
    console.log(token)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => Promise.reject(error))


export default api