import axios from "axios";

const {REACT_APP_SERVER_URL} = process.env;

export const publicRequest = axios.create({
    baseURL: `${REACT_APP_SERVER_URL}/api`,
  });