const API = import.meta.env.VITE_API_URL;

axios.post(`${API}/api/auth/login`, data);

axios.get(`${API}/api/members`);

axios.post(`${API}/api/events`);