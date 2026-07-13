import axios from "axios";

const api = axios.create({
    // baseURL:"http://localhost:5000",
    baseURL:"https://backend-production-bd60.up.railway.app",
    withCredentials:true
})

export default api