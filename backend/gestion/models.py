from django.db import models


class Etudiant(models.Model):
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    date_naissance = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Étudiant"
        verbose_name_plural = "Étudiants"
        ordering = ['nom', 'prenom']

    def __str__(self):
        return f"{self.prenom} {self.nom}"


class Matiere(models.Model):
    code = models.CharField(max_length=20, unique=True)
    nom = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    credits = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Matière"
        verbose_name_plural = "Matières"
        ordering = ['code']

    def __str__(self):
        return f"{self.code} - {self.nom}"


class Inscription(models.Model):
    etudiant = models.ForeignKey(Etudiant, on_delete=models.CASCADE, related_name='inscriptions')
    matiere = models.ForeignKey(Matiere, on_delete=models.CASCADE, related_name='inscriptions')
    date_inscription = models.DateTimeField(auto_now_add=True)
    note = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    
    class Meta:
        verbose_name = "Inscription"
        verbose_name_plural = "Inscriptions"
        unique_together = ['etudiant', 'matiere']
        ordering = ['-date_inscription']

    def __str__(self):
        return f"{self.etudiant} - {self.matiere}"

