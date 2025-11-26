from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Etudiant, Matiere, Inscription
from .serializers import (
    EtudiantSerializer, 
    MatiereSerializer, 
    InscriptionSerializer,
    InscriptionDetailSerializer
)


class EtudiantViewSet(viewsets.ModelViewSet):
    queryset = Etudiant.objects.all()
    serializer_class = EtudiantSerializer


class MatiereViewSet(viewsets.ModelViewSet):
    queryset = Matiere.objects.all()
    serializer_class = MatiereSerializer


class InscriptionViewSet(viewsets.ModelViewSet):
    queryset = Inscription.objects.all()
    serializer_class = InscriptionSerializer
    
    def get_serializer_class(self):
        if self.action == 'retrieve' or self.action == 'list':
            return InscriptionDetailSerializer
        return InscriptionSerializer

