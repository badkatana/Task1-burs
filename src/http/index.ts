import axios, { AxiosError } from "axios";

export const variantHost = axios.create({
  baseURL: process.env.REACT_APP_VARIANT_HOST,
});

variantHost.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error("Axios error:", error);
    return Promise.reject;
  }
);
