import axios from "axios";
import { SERVER_URL } from "./constants";

const appAxios = axios.create({
  baseURL: `${SERVER_URL}/api`,
  timeout: 10000,
});

export default appAxios;
