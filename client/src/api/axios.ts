import axios from "axios";
import { BASEAPI } from "./apis";

const api = axios.create({
    baseURL: BASEAPI,
    headers: {
        "Content-Type": "application/json"
    }
})

export default api