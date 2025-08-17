import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 1_000_000,
});


export default api;