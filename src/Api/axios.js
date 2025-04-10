import axios from "axios"

const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/shop-d5ada/us-central1/api",
  // deployed version of amazon server on render.com
  baseURL: "https://amazon-api-deploy-yqrm.onrender.com",
});

export {axiosInstance};