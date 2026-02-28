import API from "./axios";

export const createRide = (data) => {
  return API.post("/rides/", data);
};

export const getUserHistory = () => {
  return API.get("/rides/user/history");
};

export const getPendingRides = () => {
  return API.get("/rides/pending");
};

export const acceptRide = (rideId) => {
  return API.put(`/rides/accept/${rideId}`);
};

export const completeRide = (rideId) => {
  return API.put(`/rides/complete/${rideId}`);
};

export const getDriverHistory = () => {
  return API.get("/rides/driver/history");
};