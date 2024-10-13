import axios from "axios";
const API_URL = import.meta.env.VITE_BASE_URL;

export const getHeaders = (json) => {
  const token = localStorage.getItem("accessToken");
  return {
    "Content-Type": json ? "application/json" : "multipart/form-data",
    Authorization: `Bearer ${token ?? ""}`,
  };
};
export const handleError = (error) => {
  let refreshToken = localStorage.getItem("refreshToken");
  let username = localStorage.getItem("mail");
  if (refreshToken && error.response.status === 401 && username) {
    return axios
      .post(`${API_URL}/refreshToken`, {
        token: refreshToken,
        mail: username,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken[0]);
          return null;
        }
      })
      .catch(() => {
        localStorage.clear();
        window.location.href = "http://localhost:5173/login";
        return null;
      });
  } else {
    return Promise.reject(error);
  }
};
