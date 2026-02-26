import API from "./axios";

// USER REGISTER
export const registerUser = (data) =>
  API.post("/register/user", data);

// DRIVER REGISTER
export const registerDriver = (data) =>
  API.post("/register/driver", data);

// LOGIN (JWT)
export const loginUser = (data) =>
  API.post("/login", data);