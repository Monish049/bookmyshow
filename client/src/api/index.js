import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://ticket-booking-webservice.onrender.com",
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
