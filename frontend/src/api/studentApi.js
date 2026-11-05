import axios from 'axios';

// Backend Spring Boot Student API endpoint
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/manco/students';

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
