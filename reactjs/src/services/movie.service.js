import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/movies";

const getPrivateMovies = () => {
    return axios.get(`${API_URL}/`, { headers: authHeader() });
    }

const movieService = {
    getPrivateMovies
};

export default movieService;
