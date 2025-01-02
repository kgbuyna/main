import axios, { AxiosError, AxiosInstance } from "axios";
import { getUserData, updateUserData } from "./handlers";

const axiosClient = (baseUrl: string, userKey?: string): AxiosInstance => {
  const client = axios.create({
    baseURL: baseUrl || "http://localhost:8000/",
    headers: {
      "Content-Type": "application/json",
      Authorization: userKey ? `Bearer ${getUserData(userKey, "token")}` : "",
    },
    timeout: 60000,
    withCredentials: false,
  });

  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      console.log("error", error);
      if (error.response?.status == 401 && userKey) {
        // jump to the login page
        console.log("here", userKey);
        updateUserData(userKey, "token", "");
        updateUserData(userKey, "user", "{}");
        updateUserData(userKey, "currentRoute", "login");
        window.location.reload(); // Refresh the page
      }
      return Promise.reject(error);
    }
  );
  return client;
};

export default axiosClient;
