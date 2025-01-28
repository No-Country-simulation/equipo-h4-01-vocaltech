from django.db import models
from catalogs.models.nationalities import Nationality


# Create your models here.
class State(models.Model):
    name = models.CharField(max_length=70)
    nationality = models.ForeignKey(
        Nationality, on_delete=models.PROTECT, related_name="nationality"
    )

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "States"
        verbose_name = "State"

    def __str__(self):
        return str(self.name)
