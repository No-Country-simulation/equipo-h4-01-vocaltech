from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _

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

    class Meta:
        db_table = 'citas'
        managed = True

    def __str__(self):
        return self.motivo
