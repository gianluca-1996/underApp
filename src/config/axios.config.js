import axios from "axios";

const useAxiosInterceptor = () => {

    const instance = axios.create({
        baseURL: 'http://localhost:8080'
    });

    //interceptor para las solicitudes
    instance.interceptors.request.use(config => {
        const token = localStorage.getItem('token');
        if(token) config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    }, error => {
        return Promise.reject(error);
    });

/*
    instance.interceptors.response.use((response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      }, (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        //alert('Axios Error: ' + error.response.data)
        return Promise.reject(error);
      });
*/

    return instance;
}

export default useAxiosInterceptor;