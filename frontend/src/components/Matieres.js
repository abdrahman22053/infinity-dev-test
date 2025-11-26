import React, { useState, useEffect } from 'react';
import { getMatieres, createMatiere, updateMatiere, deleteMatiere } from '../services/api';

const Matieres = () => {
  const [matieres, setMatieres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    nom: '',
    description: '',
    credits: 0,
  });

  useEffect(() => {
    loadMatieres();
  }, []);

  const loadMatieres = async () => {
    try {
      const response = await getMatieres();
      // Gérer la pagination Django REST Framework
      const data = Array.isArray(response.data) ? response.data : (response.data.results || []);
      setMatieres(data);
    } catch (error) {
      console.error('Erreur lors du chargement des matières:', error);
      alert('Erreur lors du chargement des matières');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateMatiere(editingId, formData);
      } else {
        await createMatiere(formData);
      }
      loadMatieres();
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleEdit = (matiere) => {
    setEditingId(matiere.id);
    setFormData({
      code: matiere.code,
      nom: matiere.nom,
      description: matiere.description || '',
      credits: matiere.credits || 0,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette matière ?')) {
      try {
        await deleteMatiere(id);
        loadMatieres();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      nom: '',
      description: '',
      credits: 0,
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
          <h2>Liste des Matières</h2>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Annuler' : '+ Ajouter une matière'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <div className="form-group">
              <label>Code *</label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="Ex: MAT101"
              />
            </div>
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
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Crédits</label>
              <input
                type="number"
                min="0"
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) || 0 })}
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
          {!Array.isArray(matieres) || matieres.length === 0 ? (
            <div className="empty-state">
              <p>Aucune matière enregistrée</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Code</th>
                  <th>Nom</th>
                  <th>Description</th>
                  <th>Crédits</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {matieres.map((matiere) => (
                  <tr key={matiere.id}>
                    <td>{matiere.id}</td>
                    <td>{matiere.code}</td>
                    <td>{matiere.nom}</td>
                    <td>{matiere.description || '-'}</td>
                    <td>{matiere.credits}</td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn btn-success btn-small"
                          onClick={() => handleEdit(matiere)}
                        >
                          Modifier
                        </button>
                        <button
                          className="btn btn-danger btn-small"
                          onClick={() => handleDelete(matiere.id)}
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

export default Matieres;

