from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EtudiantViewSet, MatiereViewSet, InscriptionViewSet

router = DefaultRouter()
router.register(r'etudiants', EtudiantViewSet, basename='etudiant')
router.register(r'matieres', MatiereViewSet, basename='matiere')
router.register(r'inscriptions', InscriptionViewSet, basename='inscription')

urlpatterns = [
    path('', include(router.urls)),
]

