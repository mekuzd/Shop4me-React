import axios from "axios";

const http = axios.create({
  baseURL: "https://fakestoreapi.com",
  // baseURL: "https://us1.locationiq.com",
});

http.interceptors.request.use(
  (config) => {
    return Promise.resolve(config);
    //data can be intercepted before getiing to the server while using post request
  },
  (error) => {
    return Promise.reject(error);
  },
);
http.interceptors.response.use(
  (response) => {
    // console.log(response.data);  responses from api server can b edited using the response interceptors

    return Promise.resolve(response);
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default http;
