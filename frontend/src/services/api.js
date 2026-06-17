const BASE_URL = 'https://eafc26-men-dev-daxinkumar.onrender.com';

class FetchError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'FetchError';
    this.response = {
      status,
      data
    };
  }
}

const fetchWrapper = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers || {})
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  const contentType = response.headers.get('content-type');
  let data = null;
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  }

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
    }
    throw new FetchError(data?.message || response.statusText, response.status, data);
  }

  return { data };
};

const api = {
  get: (endpoint, options) => fetchWrapper(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) => fetchWrapper(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  patch: (endpoint, body, options) => fetchWrapper(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
  delete: (endpoint, options) => fetchWrapper(endpoint, { ...options, method: 'DELETE' }),
};

export default api;
