import axios from 'axios';

const API_URL = 'http://localhost:5000/api/traducciones';

// Obtener todas las traducciones
export const getAllTraducciones = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Obtener traducción por ID
export const getTraduccionById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Traducir palabra
export const traducirPalabra = async (palabra) => {
  const response = await axios.get(`${API_URL}/traducir/${palabra}`);
  return response.data;
};

// Crear nueva traducción
export const createTraduccion = async (traduccion) => {
  const response = await axios.post(API_URL, traduccion);
  return response.data;
};

// Actualizar traducción
export const updateTraduccion = async (id, traduccion) => {
  const response = await axios.put(`${API_URL}/${id}`, traduccion);
  return response.data;
};

// Eliminar traducción
export const deleteTraduccion = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
