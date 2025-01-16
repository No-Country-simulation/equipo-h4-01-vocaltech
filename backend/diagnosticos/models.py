from django.db import models

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

    def __str__(self):
        return self.texto
    
    class Meta:
        db_table = 'preguntas'
        managed = True

class PesoPregunta(models.Model):
    pregunta = models.ForeignKey(Pregunta, on_delete=models.CASCADE)
    categoría = models.CharField(max_length=20, choices=TipoDiagnostico.choices)
    peso = models.IntegerField()
    
    class Meta:
        db_table = 'pesos_preguntas'
        managed = True
    