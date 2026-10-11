import axios from 'axios';

// Instância única do Axios para toda a aplicação.
const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 15000,
});

export const MENS_CATEGORIES = ['mens-shirts', 'mens-shoes', 'mens-watches'];

export const WOMENS_CATEGORIES = [
  'womens-bags',
  'womens-dresses',
  'womens-jewellery',
  'womens-shoes',
  'womens-watches',
];

export async function getProductsByCategory(category) {
  const { data } = await api.get(`/products/category/${category}`);
  return data.products;
}

export async function getProductById(id) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

// Converte erros do Axios em mensagens amigáveis para o usuário.
export function getErrorMessage(error) {
  if (error.code === 'ECONNABORTED') {
    return 'A requisição demorou demais. Tente novamente.';
  }
  if (error.response) {
    return `Erro do servidor (${error.response.status}). Tente novamente.`;
  }
  if (error.request) {
    return 'Sem conexão com a internet. Verifique sua rede.';
  }
  return 'Ocorreu um erro inesperado.';
}

export default api;
