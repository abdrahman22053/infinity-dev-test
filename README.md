# 🎓 Gestion des Étudiants & Matières

Un système de gestion académique avec Django (backend) et React (frontend) pour gérer les étudiants, les matières et les inscriptions.

## 📋 Fonctionnalités

- **Gestion des Étudiants** : Créer, modifier, supprimer et lister les étudiants
- **Gestion des Matières** : Créer, modifier, supprimer et lister les matières
- **Gestion des Inscriptions** : Inscrire des étudiants à des matières et gérer les notes

## 🛠️ Technologies

### Backend
- Django 4.2.7
- Django REST Framework
- SQLite (base de données)

### Frontend
- React 18.2.0
- Axios (pour les appels API)
- CSS moderne avec design responsive

## 📦 Installation

### Prérequis
- Python 3.8+
- Node.js 14+
- npm ou yarn

### Backend (Django)

1. Naviguez vers le dossier backend :
```bash
cd backend
```

2. Créez un environnement virtuel (optionnel mais recommandé) :
```bash
python3 -m venv venv
source venv/bin/activate  # Sur Linux/Mac
# ou
venv\Scripts\activate  # Sur Windows
```

3. Installez les dépendances :
```bash
pip install -r requirements.txt
```

4. Effectuez les migrations :
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Créez un superutilisateur (optionnel) :
```bash
python manage.py createsuperuser
```

6. Lancez le serveur :
```bash
python manage.py runserver
```

Le serveur Django sera accessible sur `http://localhost:8000`

### Frontend (React)

1. Naviguez vers le dossier frontend :
```bash
cd frontend
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez l'application :
```bash
npm start
```

L'application React sera accessible sur `http://localhost:3000`

## 📁 Structure du Projet

```
presentation_infinity/
├── backend/
│   ├── config/          # Configuration Django
│   ├── gestion/         # Application principale
│   │   ├── models.py    # Modèles (Etudiant, Matiere, Inscription)
│   │   ├── views.py     # Vues API
│   │   ├── serializers.py
│   │   └── urls.py
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/  # Composants React
│   │   │   ├── Etudiants.js
│   │   │   ├── Matieres.js
│   │   │   └── Inscriptions.js
│   │   ├── services/
│   │   │   └── api.js   # Service API
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Étudiants
- `GET /api/etudiants/` - Liste tous les étudiants
- `POST /api/etudiants/` - Créer un étudiant
- `GET /api/etudiants/{id}/` - Détails d'un étudiant
- `PUT /api/etudiants/{id}/` - Modifier un étudiant
- `DELETE /api/etudiants/{id}/` - Supprimer un étudiant

### Matières
- `GET /api/matieres/` - Liste toutes les matières
- `POST /api/matieres/` - Créer une matière
- `GET /api/matieres/{id}/` - Détails d'une matière
- `PUT /api/matieres/{id}/` - Modifier une matière
- `DELETE /api/matieres/{id}/` - Supprimer une matière

### Inscriptions
- `GET /api/inscriptions/` - Liste toutes les inscriptions
- `POST /api/inscriptions/` - Créer une inscription
- `GET /api/inscriptions/{id}/` - Détails d'une inscription
- `PUT /api/inscriptions/{id}/` - Modifier une inscription
- `DELETE /api/inscriptions/{id}/` - Supprimer une inscription

## 🎯 Utilisation

1. Démarrez le serveur Django (backend)
2. Démarrez l'application React (frontend)
3. Ouvrez votre navigateur sur `http://localhost:3000`
4. Utilisez les onglets pour naviguer entre :
   - **Étudiants** : Gérer la liste des étudiants
   - **Matières** : Gérer la liste des matières
   - **Inscriptions** : Gérer les inscriptions des étudiants aux matières

## 📝 Notes

- Les inscriptions sont uniques : un étudiant ne peut s'inscrire qu'une seule fois à une matière
- Les notes sont optionnelles et peuvent être ajoutées/modifiées après l'inscription
- L'email de l'étudiant doit être unique

## 🔒 Sécurité

⚠️ **Note** : Ce projet est configuré pour le développement. Pour la production :
- Changez `SECRET_KEY` dans `settings.py`
- Configurez `ALLOWED_HOSTS` correctement
- Activez HTTPS
- Configurez CORS de manière restrictive
- Ajoutez l'authentification et les permissions appropriées

## 📄 Licence

Ce projet est un exemple éducatif.

