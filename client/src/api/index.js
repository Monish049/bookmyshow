import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://book-my-show-w98p.onrender.com/",
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
