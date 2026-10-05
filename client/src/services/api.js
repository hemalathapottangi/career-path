import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

if (!API_BASE) {
  console.error('❌ VITE_API_URL is not set. Create client/.env with VITE_API_URL=http://localhost:5000/api');
}

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('careerpath_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Normalise error responses
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.message ||
      err.message ||
      'Something went wrong. Please try again.';
    return Promise.reject(new Error(message));
  }
);

// ── Auth ──────────────────────────────────────────────────────────
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login:    (data) => api.post('/auth/login', data),
  getMe:    ()     => api.get('/auth/me'),
};

// ── Profile ───────────────────────────────────────────────────────
export const profileAPI = {
  update:              (data) => api.put('/profile', data),
  setSelectedCareer:   (careerId) => api.put('/profile/career', { careerId }),
  updateSkillProgress: (data) => api.put('/profile/progress', data),
  getProgress:         (careerId) => api.get(`/profile/progress/${careerId}`),
  reset:               () => api.delete('/profile/reset'),
};

// ── Assessment ────────────────────────────────────────────────────
export const assessmentAPI = {
  run:        (profile) => api.post('/assessment/run', { profile }),
  getResults: ()        => api.get('/assessment/results'),
};

// ── Careers ───────────────────────────────────────────────────────
export const careerAPI = {
  getAll:     (params) => api.get('/careers', { params }),
  getById:    (id)     => api.get(`/careers/${id}`),
  getSkillGap:(id)     => api.get(`/careers/${id}/skill-gap`),
  getCatalog: ()       => api.get('/careers/catalog'),
};

export default api;
