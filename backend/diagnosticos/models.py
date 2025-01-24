from django.db import models

class Service(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class QuestionGroup(models.Model):
    name = models.CharField(max_length=255)
    CLIENT_TYPES = [
        ('entrepreneur', 'Emprendedores'),
        ('business', 'Empresas'),
    ]
    client_type = models.CharField(max_length=20, choices=CLIENT_TYPES)

    def __str__(self):
        return f"{self.name} ({self.get_client_type_display()})"

class Question(models.Model):
    QUESTION_TYPES = [
        ('text', 'Texto'),
        ('radio', 'Opción única'),
        ('checkbox', 'Múltiples opciones'),
        ('number', 'Número'),
        ('yes_no', 'Sí/No'),
    ]
    group = models.ForeignKey('QuestionGroup', on_delete=models.CASCADE, related_name='questions')
    text = models.CharField(max_length=255)
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPES)
    required = models.BooleanField(default=True)
    services = models.ManyToManyField('Service', related_name='questions', blank=True)
    
    # Usamos JSONField para almacenar las opciones como una lista de diccionarios
    options = models.JSONField(default=list)

    def __str__(self):
        return self.text

    def get_options(self):
        # Método para obtener las opciones en un formato legible
        return self.options