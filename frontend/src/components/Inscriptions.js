import React, { useState, useEffect } from 'react';
import { getInscriptions, createInscription, updateInscription, deleteInscription, getInscription } from '../services/api';
import { getEtudiants } from '../services/api';
import { getMatieres } from '../services/api';

const Inscriptions = () => {
  const [inscriptions, setInscriptions] = useState([]);
  const [etudiants, setEtudiants] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedInscription, setSelectedInscription] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    etudiant: '',
    matiere: '',
    note: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [inscriptionsRes, etudiantsRes, matieresRes] = await Promise.all([
        getInscriptions(),
        getEtudiants(),
        getMatieres(),
      ]);
      // Gérer la pagination Django REST Framework
      const inscriptionsData = Array.isArray(inscriptionsRes.data) ? inscriptionsRes.data : (inscriptionsRes.data.results || []);
      const etudiantsData = Array.isArray(etudiantsRes.data) ? etudiantsRes.data : (etudiantsRes.data.results || []);
      const matieresData = Array.isArray(matieresRes.data) ? matieresRes.data : (matieresRes.data.results || []);
      setInscriptions(inscriptionsData);
      setEtudiants(etudiantsData);
      setMatieres(matieresData);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      alert('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        etudiant: parseInt(formData.etudiant),
        matiere: parseInt(formData.matiere),
        note: formData.note ? parseFloat(formData.note) : null,
      };
      
      if (editingId) {
        await updateInscription(editingId, data);
      } else {
        await createInscription(data);
      }
      loadData();
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde. Vérifiez que l\'étudiant n\'est pas déjà inscrit à cette matière.');
    }
  };

  const handleEdit = (inscription) => {
    setEditingId(inscription.id);
    // Gérer les deux formats : avec objet complet ou juste les IDs
    const etudiantId = inscription.etudiant?.id || inscription.etudiant;
    const matiereId = inscription.matiere?.id || inscription.matiere;
    setFormData({
      etudiant: etudiantId.toString(),
      matiere: matiereId.toString(),
      note: inscription.note || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette inscription ?')) {
      try {
        await deleteInscription(id);
        loadData();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const handleViewDetails = async (id) => {
    try {
      const response = await getInscription(id);
      setSelectedInscription(response.data);
      setShowDetails(true);
    } catch (error) {
      console.error('Erreur lors du chargement des détails:', error);
      alert('Erreur lors du chargement des détails');
    }
  };

  const resetForm = () => {
    setFormData({
      etudiant: '',
      matiere: '',
      note: '',
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
          <h2>Liste des Inscriptions</h2>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Annuler' : '+ Ajouter une inscription'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <div className="form-group">
              <label>Étudiant *</label>
              <select
                required
                value={formData.etudiant}
                onChange={(e) => setFormData({ ...formData, etudiant: e.target.value })}
              >
                <option value="">Sélectionner un étudiant</option>
                {etudiants.map((etudiant) => (
                  <option key={etudiant.id} value={etudiant.id}>
                    {etudiant.prenom} {etudiant.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Matière *</label>
              <select
                required
                value={formData.matiere}
                onChange={(e) => setFormData({ ...formData, matiere: e.target.value })}
              >
                <option value="">Sélectionner une matière</option>
                {matieres.map((matiere) => (
                  <option key={matiere.id} value={matiere.id}>
                    {matiere.code} - {matiere.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Note</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="20"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                placeholder="Note sur 20 (optionnel)"
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
          {!Array.isArray(inscriptions) || inscriptions.length === 0 ? (
            <div className="empty-state">
              <p>Aucune inscription enregistrée</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Étudiant</th>
                  <th>Matière</th>
                  <th>Date d'inscription</th>
                  <th>Note</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inscriptions.map((inscription) => (
                  <tr key={inscription.id}>
                    <td>{inscription.id}</td>
                    <td>
                      {inscription.etudiant?.prenom} {inscription.etudiant?.nom}
                    </td>
                    <td>
                      {inscription.matiere?.code} - {inscription.matiere?.nom}
                    </td>
                    <td>
                      {inscription.date_inscription
                        ? new Date(inscription.date_inscription).toLocaleDateString('fr-FR')
                        : '-'}
                    </td>
                    <td>{inscription.note || '-'}</td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn btn-primary btn-small"
                          onClick={() => handleViewDetails(inscription.id)}
                          style={{ marginRight: '5px' }}
                        >
                          Détails
                        </button>
                        <button
                          className="btn btn-success btn-small"
                          onClick={() => handleEdit(inscription)}
                          style={{ marginRight: '5px' }}
                        >
                          Modifier
                        </button>
                        <button
                          className="btn btn-danger btn-small"
                          onClick={() => handleDelete(inscription.id)}
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

      {/* Modal de détails */}
      {showDetails && selectedInscription && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }} onClick={() => setShowDetails(false)}>
          <div className="card" style={{
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>Détails de l'inscription #{selectedInscription.id}</h2>
              <button
                className="btn btn-secondary"
                onClick={() => setShowDetails(false)}
                style={{ padding: '8px 16px' }}
              >
                ✕ Fermer
              </button>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#667eea', marginBottom: '15px', borderBottom: '2px solid #667eea', paddingBottom: '10px' }}>
                📚 Informations sur l'inscription
              </h3>
              <div style={{ display: 'grid', gap: '15px' }}>
                <div>
                  <strong>ID de l'inscription :</strong> {selectedInscription.id}
                </div>
                <div>
                  <strong>Date d'inscription :</strong>{' '}
                  {selectedInscription.date_inscription
                    ? new Date(selectedInscription.date_inscription).toLocaleString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    : '-'}
                </div>
                <div>
                  <strong>Note :</strong>{' '}
                  {selectedInscription.note !== null && selectedInscription.note !== undefined
                    ? `${selectedInscription.note}/20`
                    : 'Aucune note attribuée'}
                </div>
              </div>
            </div>

            {selectedInscription.etudiant && (
              <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <h3 style={{ color: '#667eea', marginBottom: '15px', borderBottom: '2px solid #667eea', paddingBottom: '10px' }}>
                  👤 Informations de l'étudiant
                </h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <div>
                    <strong>ID :</strong> {selectedInscription.etudiant.id}
                  </div>
                  <div>
                    <strong>Nom complet :</strong> {selectedInscription.etudiant.prenom} {selectedInscription.etudiant.nom}
                  </div>
                  <div>
                    <strong>Email :</strong> {selectedInscription.etudiant.email}
                  </div>
                  {selectedInscription.etudiant.date_naissance && (
                    <div>
                      <strong>Date de naissance :</strong>{' '}
                      {new Date(selectedInscription.etudiant.date_naissance).toLocaleDateString('fr-FR')}
                    </div>
                  )}
                  {selectedInscription.etudiant.created_at && (
                    <div>
                      <strong>Date d'enregistrement :</strong>{' '}
                      {new Date(selectedInscription.etudiant.created_at).toLocaleDateString('fr-FR')}
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedInscription.matiere && (
              <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <h3 style={{ color: '#667eea', marginBottom: '15px', borderBottom: '2px solid #667eea', paddingBottom: '10px' }}>
                  📖 Informations de la matière
                </h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <div>
                    <strong>ID :</strong> {selectedInscription.matiere.id}
                  </div>
                  <div>
                    <strong>Code :</strong> {selectedInscription.matiere.code}
                  </div>
                  <div>
                    <strong>Nom :</strong> {selectedInscription.matiere.nom}
                  </div>
                  {selectedInscription.matiere.description && (
                    <div>
                      <strong>Description :</strong> {selectedInscription.matiere.description}
                    </div>
                  )}
                  <div>
                    <strong>Crédits :</strong> {selectedInscription.matiere.credits}
                  </div>
                  {selectedInscription.matiere.created_at && (
                    <div>
                      <strong>Date de création :</strong>{' '}
                      {new Date(selectedInscription.matiere.created_at).toLocaleDateString('fr-FR')}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                className="btn btn-success"
                onClick={() => {
                  if (selectedInscription) {
                    handleEdit(selectedInscription);
                    setShowDetails(false);
                  }
                }}
              >
                Modifier cette inscription
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowDetails(false)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inscriptions;

