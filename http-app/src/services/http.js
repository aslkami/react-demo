import axios from "axios";
import { toast } from "react-toastify";
import logger from "./log";

axios.interceptors.response.use(null, error => {
  const errorStatus =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!errorStatus) {
    // console.log("logging error", error);
    logger.log(error);
    toast("An unexpected error occurred!");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
