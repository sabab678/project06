import axios from "axios";

const api = axios.create({
    // baseURL:"http://localhost:5000",
    baseURL:"https://project06-u2qf.vercel.app",
    withCredentials:true
})

export default api