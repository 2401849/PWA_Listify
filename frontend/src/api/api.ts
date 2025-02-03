import type {AxiosInstance, InternalAxiosRequestConfig} from "axios";
import axios from "axios";
import {useUserAuthStore} from "@/stores/auth.ts";
import router from "@/router";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const authStore = useUserAuthStore();

  if (authStore.isTokenExpired) {
    await authStore.refreshAccessToken();
  }

  if (authStore.userToken) {
    config.headers.Authorization = `Bearer ${authStore.userToken}`;
  }
  return config;
});
api.interceptors.response.use((response) => response, async (error) => {
  const authStore = useUserAuthStore();

  const { config, response } = error;
  const status = response?.status;

  let message = "An unknown error occurred.";
  if (response?.data) {
    message =
      response.data.message.message ||
      response.data.message
  }

  if (status === 401 && !config._retry) {
    config._retry = true;

    try {
      await authStore.refreshAccessToken();
      config.headers.Authorization = `Bearer ${authStore.userToken}`;
      return api(config)
    } catch (error) {
      await authStore.logout()
      await router.push('/login')
      return Promise.reject(new Error("Session expired. Please log in again."));
    }
  }
  return Promise.reject(new Error(message));
});

export const clearApiHeaders = () => {
  api.defaults.headers.common["Authorization"] = "";
};

export default api;
