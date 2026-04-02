import axios from "axios";

const API = axios.create({
  baseURL: "https://collabsync-1-aq1c.onrender.com/api",
  withCredentials: true, // send cookies
});

export default API;
