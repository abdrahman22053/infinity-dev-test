import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Étudiants
export const getEtudiants = () => api.get('/etudiants/');
export const getEtudiant = (id) => api.get(`/etudiants/${id}/`);
export const createEtudiant = (data) => api.post('/etudiants/', data);
export const updateEtudiant = (id, data) => api.put(`/etudiants/${id}/`, data);
export const deleteEtudiant = (id) => api.delete(`/etudiants/${id}/`);

// Matières
export const getMatieres = () => api.get('/matieres/');
export const getMatiere = (id) => api.get(`/matieres/${id}/`);
export const createMatiere = (data) => api.post('/matieres/', data);
export const updateMatiere = (id, data) => api.put(`/matieres/${id}/`, data);
export const deleteMatiere = (id) => api.delete(`/matieres/${id}/`);

// Inscriptions
export const getInscriptions = () => api.get('/inscriptions/');
export const getInscription = (id) => api.get(`/inscriptions/${id}/`);
export const createInscription = (data) => api.post('/inscriptions/', data);
export const updateInscription = (id, data) => api.put(`/inscriptions/${id}/`, data);
export const deleteInscription = (id) => api.delete(`/inscriptions/${id}/`);

export default api;

