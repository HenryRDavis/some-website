import axios from "axios";

const axiosWithAuth = () => {
    const token = window.localStorage.getItem("token");
    return axios.create({
        baseURL: "http://wonderlist-backend.herokuapp.com/",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export default axiosWithAuth
