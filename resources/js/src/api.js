const axios = window.axios;

const BASE_API_URL = 'http://localhost:8000/api';

export default {
    getAllNews: () => axios.get(`${BASE_API_URL}/news`),
    getNews: (id) => axios.get(`${BASE_API_URL}/news/${id}/edit`),
    addNews: (data) => axios.post(`${BASE_API_URL}/news`, data),
    updateNews: (data, id) => axios.put(`${BASE_API_URL}/news/${id}`, data),
    deleteNews: (id) => axios.delete(`${BASE_API_URL}/news/${id}`),
    searchNews: (s) => axios.get(`${BASE_API_URL}/search/${s}`)
}