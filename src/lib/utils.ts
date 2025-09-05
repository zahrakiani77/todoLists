import axios from "axios";

const accessTocken = import.meta.env.VITE_ACCESS_TOKEN;
export const axiosInstance = axios.create({
  baseURL: "https://crudify.dev/api/v1",
  headers: {
    Authorization: `Bearer ${accessTocken}`,
  },
});