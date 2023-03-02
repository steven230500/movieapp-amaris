import axios from 'axios';

const API_KEY = '8e3656b6ef805c33a1cd223126ead20a';

const MovieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
  },
});

export default MovieApi;
