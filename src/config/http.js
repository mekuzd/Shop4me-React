import axios from "axios";

const http = axios.create({
  baseURL: "https://fakestoreapi.com",
});

http.interceptors.request.use(
  (config) => {
    return Promise.resolve(config);
  },
  (error) => {
    return Promise.reject(error);
  },
);
http.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default http;
