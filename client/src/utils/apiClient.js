import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:31670/api/v0.0.0-alpha/";

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',

    }
});

const _get = (url, config= {}) => {
    return apiClient.get(url, config);
}

const _post = (url, data= {}, config = {}) => {
    return apiClient.post(url, data, config);
}

const _put = (url, data= {}, config = {}) => {
    return apiClient.put(url, data, config);
}

const _delete = (url, config = {}) => {
    return apiClient.delete(url, config);
}

export { _get, _post, _put, _delete };