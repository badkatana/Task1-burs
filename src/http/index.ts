import axios from "axios";

export const variantHost = axios.create({
  baseURL: process.env.REACT_APP_VARIANT_HOST,
});
