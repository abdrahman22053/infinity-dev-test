import React, { useState, useEffect } from 'react';
import { getEtudiants, createEtudiant, updateEtudiant, deleteEtudiant } from '../services/api';

const Etudiants = () => {
  const [etudiants, setEtudiants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    date_naissance: '',
  });

  useEffect(() => {
    loadEtudiants();
  }, []);

  const loadEtudiants = async () => {
    try {
      const response = await getEtudiants();
      // Gérer la pagination Django REST Framework
      const data = Array.isArray(response.data) ? response.data : (response.data.results || []);
      setEtudiants(data);
    } catch (error) {
      console.error('Erreur lors du chargement des étudiants:', error);
      alert('Erreur lors du chargement des étudiants');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateEtudiant(editingId, formData);
      } else {
        await createEtudiant(formData);
      }
      loadEtudiants();
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleEdit = (etudiant) => {
    setEditingId(etudiant.id);
    setFormData({
      nom: etudiant.nom,
      prenom: etudiant.prenom,
      email: etudiant.email,
      date_naissance: etudiant.date_naissance || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      try {
        await deleteEtudiant(id);
        loadEtudiants();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      date_naissance: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="card">Chargement...</div>;
  }

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Liste des Étudiants</h2>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Annuler' : '+ Ajouter un étudiant'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <div className="form-group">
              <label>Nom *</label>
              <input
                type="text"
                required
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Prénom *</label>
              <input
                type="text"
                required
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Date de naissance</label>
              <input
                type="date"
                value={formData.date_naissance}
                onChange={(e) => setFormData({ ...formData, date_naissance: e.target.value })}
              />
            </div>
            <div className="button-group">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Modifier' : 'Ajouter'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Annuler
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="card">
        <div className="table-container">
          {!Array.isArray(etudiants) || etudiants.length === 0 ? (
            <div className="empty-state">
              <p>Aucun étudiant enregistré</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Email</th>
                  <th>Date de naissance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {etudiants.map((etudiant) => (
                  <tr key={etudiant.id}>
                    <td>{etudiant.id}</td>
                    <td>{etudiant.nom}</td>
                    <td>{etudiant.prenom}</td>
                    <td>{etudiant.email}</td>
                    <td>{etudiant.date_naissance || '-'}</td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn btn-success btn-small"
                          onClick={() => handleEdit(etudiant)}
                        >
                          Modifier
                        </button>
                        <button
                          className="btn btn-danger btn-small"
                          onClick={() => handleDelete(etudiant.id)}
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Etudiants;

