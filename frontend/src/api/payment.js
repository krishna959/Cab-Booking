import API from "./axios";

export const add_balance = (data) => {
  return API.post("/pays/add-balance/", data);
};

export const makepayment = (data) => {
  return API.post("/pays/make-payment/", data);
};

export const get_driver_income = () => {
  return API.get("/pays/driver-income/", );
};