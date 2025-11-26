from django.contrib import admin
from .models import Etudiant, Matiere, Inscription


@admin.register(Etudiant)
class EtudiantAdmin(admin.ModelAdmin):
    list_display = ('nom', 'prenom', 'email', 'date_naissance')
    search_fields = ('nom', 'prenom', 'email')
    list_filter = ('date_naissance',)


@admin.register(Matiere)
class MatiereAdmin(admin.ModelAdmin):
    list_display = ('code', 'nom', 'credits')
    search_fields = ('code', 'nom')
    list_filter = ('credits',)


@admin.register(Inscription)
class InscriptionAdmin(admin.ModelAdmin):
    list_display = ('etudiant', 'matiere', 'date_inscription', 'note')
    search_fields = ('etudiant__nom', 'etudiant__prenom', 'matiere__nom', 'matiere__code')
    list_filter = ('date_inscription', 'matiere')
    autocomplete_fields = ['etudiant', 'matiere']

