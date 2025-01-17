import axios from 'axios';

// Criação de uma instância Axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api', // URL base da API
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação (opcional)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Obtém o token do localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para lidar com respostas ou erros globais
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('Não autorizado. Redirecionando para login.');
        window.location.href = '/login'; // Redireciona para a página de login
      } else if (error.response.status === 500) {
        console.error('Erro interno do servidor.');
      }
    } else {
      console.error('Erro na conexão com o servidor. Verifique sua rede.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;