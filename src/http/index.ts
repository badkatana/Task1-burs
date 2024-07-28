import axios from "axios";

export const cathost = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});

export const variantHost = axios.create({
  baseURL: process.env.REACT_APP_VARIANT_HOST,
});
