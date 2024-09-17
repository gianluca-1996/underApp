import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAxiosInterceptor = () => {
    const navigate = useNavigate();

    const instance = axios.create({
        baseURL: 'http://localhost:8080'
    });

    //interceptor para las solicitudes
    instance.interceptors.request.use(config => {
        const token = localStorage.getItem('token');
        if(token) config.headers['Authorization'] = `Bearer ${token}`;
        else navigate('/login');
        return config;
    }, error => {
        return Promise.reject(error);
    });

    return instance;
}

export default useAxiosInterceptor;