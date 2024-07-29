import axios, { AxiosError } from "axios";

export const variantHost = axios.create({
  baseURL: process.env.REACT_APP_VARIANT_HOST,
});

variantHost.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Логирование ошибки в консоль
    console.error("Axios error:", error);

    // Возвращаем Promise.reject для обработки ошибки в компоненте, если это необходимо
    return Promise.reject;
  }
);
