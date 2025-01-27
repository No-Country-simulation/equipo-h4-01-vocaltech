from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from auth_service.models import User

class Cita(models.Model):
    class EstadoCita(models.TextChoices):
        AGENDADA = 'AG', _('Agendada')
        CONFIRMADA = 'CO', _('Confirmada')
        COMPLETADA = 'CM', _('Completada')
        CANCELADA = 'CA', _('Cancelada')

    fecha = models.DateField()
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    motivo = models.CharField(max_length=100)
    estado = models.CharField(
        max_length=2,
        choices=EstadoCita.choices,
        default=EstadoCita.AGENDADA,
    )
    lead = models.ForeignKey(User, on_delete=models.CASCADE, related_name='citas')
    especialista = models.ForeignKey(User, on_delete=models.CASCADE, related_name='citas_asignadas')

    class Meta:
        db_table = 'citas'
        managed = True

    def __str__(self):
        return self.motivo
