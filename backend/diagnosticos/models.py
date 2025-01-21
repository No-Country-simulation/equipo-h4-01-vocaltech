from django.db import models


class Service(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    
    def __str__(self):
        return self.name

    class Meta:
        db_table = 'services'
        managed = True

class TipoDiagnostico(models.TextChoices):
    EMPRESA = 'Empresa'
    EMPRENDEDOR = 'Emprendedor'

class Pregunta(models.Model):
    texto = models.CharField(max_length=200)
    tipo_diagnostico = models.CharField(
        max_length=20,
        choices=TipoDiagnostico.choices,
        default=TipoDiagnostico.EMPRESA
    )
    tipo_pregunta = models.CharField(
        max_length=20,
        choices=[
            ('Si/No', 'Si/No'),
            ('escala', 'Escala (1-5)'),
            ('multiple_choice', 'Multiple Choice'),
            ('abierta', 'Abierta')
        ]
    )
    opciones = models.JSONField(null=True, blank=True)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    peso = models.IntegerField(default=1)

    def __str__(self):
        return self.texto
    
    class Meta:
        db_table = 'preguntas'
        managed = True

class Respuesta(models.Model):
    pregunta = models.ForeignKey(Pregunta, on_delete=models.CASCADE)
    respuesta = models.JSONField()
    tipo_diagnostico = models.CharField(max_length=20, choices=TipoDiagnostico.choices)

    class Meta:
        db_table = 'respuestas'
        managed = True

class Diagnostico(models.Model):
    nombre = models.CharField(max_length=100)
    tipo_diagnostico = models.CharField(max_length=20, choices=TipoDiagnostico.choices)
    respuestas = models.ManyToManyField(Respuesta)

    class Meta:
        db_table = 'diagnosticos'
        managed = True