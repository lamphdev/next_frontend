import axios from "axios";
import { isBrowser } from "./helper";

const internal = axios.create();
let external;

const baseUrl = `http://${process.env.BACKEND_HOST}:8080`;

export const initHttp = (baseUrl) => {
    external = axios.create({
        // baseURL: 'http://localhost:8080',
        // baseURL: 'http://18.117.179.47',
        baseURL: baseUrl,
        withCredentials: true,
    });
}

const http = () => {
    if (!external) {
        initHttp(null);
    }
    return external;
};

export default http;