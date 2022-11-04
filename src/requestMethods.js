import axios from "axios";

const {REACT_APP_API_URL} = process.env;

export const publicRequest = axios.create({
    baseURL: REACT_APP_API_URL,
  });