import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://movie-booking-service-kvps.onrender.com/",
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
