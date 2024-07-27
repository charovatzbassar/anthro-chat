import axios from "axios";
import Constants from "./constants";

const appAxios = axios.create({
  baseURL: `${Constants.SERVER_URL}/api`,
  timeout: 10000,
});

export default appAxios;
