import axios from "axios";

const httpPublic = axios.create({
    baseURL: "http://localhost:3000/api/",
    headers: {
        "Content-type": "application/json"
    }
});

export default httpPublic;