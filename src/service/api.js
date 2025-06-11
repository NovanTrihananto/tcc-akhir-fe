import axios from "axios";

const API = axios.create({
  baseURL: "https://betcc-700231807331.us-central1.run.app", // sesuaikan dengan backend kamu
});

export default API;
