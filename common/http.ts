import axios from "axios";
import { isBrowser } from "./helper";

const internal = axios.create();

const external = axios.create({
    // baseURL: 'http://localhost:8080',
    baseURL: 'http://18.117.179.47',
    withCredentials: true,
});


const http = () => external;

export default http;