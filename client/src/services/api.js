import axios from 'axios';

// Configure defaults. Since we serve from the same domain/port via Express, we can use relative URLs.
axios.defaults.baseURL = '';

export const analyzeResumeApi = async (formData) => {
  const response = await axios.post('/api/analysis/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getHistoryApi = async () => {
  const response = await axios.get('/api/history');
  return response.data;
};

export const getReportByIdApi = async (id) => {
  const response = await axios.get(`/api/history/${id}`);
  return response.data;
};

export const deleteReportApi = async (id) => {
  const deleteResponse = await axios.delete(`/api/history/${id}`);
  return deleteResponse.data;
};
export default {
  analyzeResumeApi,
  getHistoryApi,
  getReportByIdApi,
  deleteReportApi,
};
