from rest_framework import serializers
from .models import Etudiant, Matiere, Inscription


class EtudiantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etudiant
        fields = ['id', 'nom', 'prenom', 'email', 'date_naissance']


class MatiereSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matiere
        fields = ['id', 'code', 'nom', 'description', 'credits', 'created_at', 'updated_at']


class InscriptionSerializer(serializers.ModelSerializer):
    etudiant_nom = serializers.CharField(source='etudiant.__str__', read_only=True)
    matiere_nom = serializers.CharField(source='matiere.__str__', read_only=True)
    
    class Meta:
        model = Inscription
        fields = ['id', 'etudiant', 'etudiant_nom', 'matiere', 'matiere_nom', 'date_inscription', 'note']


class InscriptionDetailSerializer(serializers.ModelSerializer):
    etudiant = EtudiantSerializer(read_only=True)
    matiere = MatiereSerializer(read_only=True)
    
    class Meta:
        model = Inscription
        fields = ['id', 'etudiant', 'matiere', 'date_inscription', 'note']

