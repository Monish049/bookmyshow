import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://movie-ticket-booking-sb9j.onrender.com",
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
