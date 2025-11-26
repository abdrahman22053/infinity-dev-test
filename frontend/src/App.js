import React, { useState } from 'react';
import './index.css';
import Etudiants from './components/Etudiants';
import Matieres from './components/Matieres';
import Inscriptions from './components/Inscriptions';

function App() {
  const [activeTab, setActiveTab] = useState('etudiants');

  return (
    <div className="container">
      <div className="header">
        <h1>🎓 Gestion des Étudiants & Matières</h1>
        <p>Système de gestion des inscriptions académiques</p>
      </div>

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'etudiants' ? 'active' : ''}`}
          onClick={() => setActiveTab('etudiants')}
        >
          Étudiants
        </button>
        <button
          className={`tab-button ${activeTab === 'matieres' ? 'active' : ''}`}
          onClick={() => setActiveTab('matieres')}
        >
          Matières
        </button>
        <button
          className={`tab-button ${activeTab === 'inscriptions' ? 'active' : ''}`}
          onClick={() => setActiveTab('inscriptions')}
        >
          Inscriptions
        </button>
      </div>

      {activeTab === 'etudiants' && <Etudiants />}
      {activeTab === 'matieres' && <Matieres />}
      {activeTab === 'inscriptions' && <Inscriptions />}
    </div>
  );
}

export default App;

