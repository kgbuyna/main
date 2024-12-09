import axios, { AxiosInstance } from "axios";

const axiosClient = (baseUrl?: string, token?: string): AxiosInstance => {
  const client = axios.create({
    baseURL: baseUrl || "http://localhost:9999/",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    timeout: 60000,
    withCredentials: false,
  });
  return client;
};

export default axiosClient;
