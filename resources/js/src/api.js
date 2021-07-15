const axios = window.axios;

const BASE_API_URL = 'http://portalnoticias.fetram.com.br/api';
//const BASE_API_URL = 'http://localhost:8000/api';

export default {
    getAllNews: () => axios.get(`${BASE_API_URL}/news`),
    getNews: (id) => axios.get(`${BASE_API_URL}/news/${id}/edit`),
    addNews: (data) => axios.post(`${BASE_API_URL}/news`, data),
    updateNews: (data, id) => axios.put(`${BASE_API_URL}/news/${id}`, data),
    deleteNews: (id) => axios.delete(`${BASE_API_URL}/news/${id}`),
    getNewsByCategory: (cat) => axios.get(`${BASE_API_URL}/bycategory/${cat}`),
    
    searchNews: (s) => axios.get(`${BASE_API_URL}/search/${s}`),
    
    getAllCategories: () => axios.get(`${BASE_API_URL}/category`),
    getCategory: (id) => axios.get(`${BASE_API_URL}/category/${id}/edit`),
    addCategory: (data) => axios.post(`${BASE_API_URL}/category`, data),
    updateCategory: (data, id) => axios.put(`${BASE_API_URL}/category/${id}`, data),
    deleteCategory: (id) => axios.delete(`${BASE_API_URL}/category/${id}`)
}