import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

const Service = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  responseType: "json",
  headers: {
    Accept: "application/json",
  },
});

Service.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error.response || error.message);
  }
);

Service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    let originalRequest = error.config;
    let refreshToken = localStorage.getItem("token");
    let username = localStorage.getItem("mail");
    if (
      refreshToken &&
      (error.response.status === 403 || error.response.status === 401) &&
      !originalRequest._retry &&
      username
    ) {
      originalRequest._retry = true;
      return axios
        .post(`${API_URL}/refreshToken`, {
          token: refreshToken,
          mail: username,
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken[0]);

            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${res.data.accessToken}`;

            return Service(originalRequest);
          }
        })
        .catch(() => {
          localStorage.clear();
          window.location.href = "http://localhost:5173/login";
        });
    }
    return (
      localStorage.clear() &&
      (window.location.href = "http://localhost:5173/login") &&
      Promise.reject(error.response || error.message)
    );
  }
);

export default Service;
