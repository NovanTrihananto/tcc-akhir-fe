import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // sesuaikan dengan backend kamu
});

export default API;
