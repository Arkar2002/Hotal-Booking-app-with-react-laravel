import axios from "axios";
import toast from "react-hot-toast";

export const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACK_END_URL}/api/`,
});

axiosClient.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("ACCESS_TOKEN"));
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response.data?.data?.status === "fail") {
      toast.error(response.data.data.message);
    }
    if (response.data?.message) {
      toast.error("Fail to do the action");
    }
    console.log(response.data.message);
    if (response.status === 401) {
      window.location = "/login";
      localStorage.setItem("ACCESS_TOKEN", null);
    }
    // throw error;
  }
);
