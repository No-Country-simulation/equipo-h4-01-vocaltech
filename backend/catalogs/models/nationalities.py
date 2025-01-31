from django.db import models


class Nationality(models.Model):
    nombre = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    nom = models.CharField(max_length=50)
    iso2 = models.CharField(max_length=2)
    iso3 = models.CharField(max_length=3)
    phone_code = models.CharField(max_length=5)

    class Meta:
        db_table = "nationalities"
        verbose_name_plural = "Nationalities"
        verbose_name = "Nationality"
        ordering = [
            "-name",
        ]

    def __str__(self):
        return self.nombre
