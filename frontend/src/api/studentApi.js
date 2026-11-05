import axios from 'axios';

// Backend Spring Boot Student API endpoint
// Resolves dynamically from Render Blueprint (VITE_API_HOST), explicit override (VITE_API_BASE_URL), or local fallback
const resolveBaseUrl = () => {
  // 1. Dynamic host injected by Render Blueprint fromService (e.g. student-backend-xxxx.onrender.com)
  const host = import.meta.env.VITE_API_HOST;
  if (host && host.trim()) {
    const cleanHost = host.trim().replace(/^https?:\/\//, '').replace(/\/+$/, '');
    return `https://${cleanHost}/manco/students`;
  }

  // 2. Explicit base URL override
  const explicitUrl = import.meta.env.VITE_API_BASE_URL;
  if (explicitUrl && explicitUrl.trim()) {
    let url = explicitUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }
    return url;
  }

  // 3. Fallback for local development
  return 'http://localhost:8080/manco/students';
};

const BASE_URL = resolveBaseUrl();

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

export const studentApi = {
  // Fetch all students: GET /manco/students
  getAll: async () => {
    const response = await apiClient.get('');
    return response.data?.data || response.data;
  },

  // Fetch single student by ID: GET /manco/students/{id}
  getById: async (id) => {
    const response = await apiClient.get(`/${id}`);
    return response.data?.data || response.data;
  },

  // Create student: POST /manco/students
  create: async (studentData) => {
    const payload = {
      firstName: studentData.firstName?.trim(),
      lastName: studentData.lastName?.trim(),
      course: studentData.course?.trim(),
      section: studentData.section?.trim(),
    };
    const response = await apiClient.post('', payload);
    return response.data?.data || response.data;
  },

  // Update student: PUT /manco/students/{id}
  update: async (id, studentData) => {
    const payload = {
      firstName: studentData.firstName?.trim(),
      lastName: studentData.lastName?.trim(),
      course: studentData.course?.trim(),
      section: studentData.section?.trim(),
    };
    const response = await apiClient.put(`/${id}`, payload);
    return response.data?.data || response.data;
  },

  // Delete student: DELETE /manco/students/{id}
  delete: async (id) => {
    const response = await apiClient.delete(`/${id}`);
    return response.data?.data || response.data;
  },

  // Get active base URL
  getBaseUrl: () => BASE_URL,
};

export default studentApi;
