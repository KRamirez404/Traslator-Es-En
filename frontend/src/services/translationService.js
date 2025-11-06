import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const translationService = {
  // Get all translations
  getAllTranslations: async () => {
    const response = await axios.get(`${API_URL}/translations`);
    return response.data;
  },

  // Get translation by ID
  getTranslationById: async (id) => {
    const response = await axios.get(`${API_URL}/translations/${id}`);
    return response.data;
  },

  // Create new translation
  createTranslation: async (spanish, english) => {
    const response = await axios.post(`${API_URL}/translations`, {
      spanish,
      english
    });
    return response.data;
  },

  // Update translation
  updateTranslation: async (id, spanish, english) => {
    const response = await axios.put(`${API_URL}/translations/${id}`, {
      spanish,
      english
    });
    return response.data;
  },

  // Delete translation
  deleteTranslation: async (id) => {
    const response = await axios.delete(`${API_URL}/translations/${id}`);
    return response.data;
  },

  // Translate Spanish to English
  translateSpanishToEnglish: async (word) => {
    const response = await axios.get(`${API_URL}/translate/es-en/${word}`);
    return response.data;
  },

  // Translate English to Spanish
  translateEnglishToSpanish: async (word) => {
    const response = await axios.get(`${API_URL}/translate/en-es/${word}`);
    return response.data;
  }
};
