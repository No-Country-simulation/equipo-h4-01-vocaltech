from django.db import models
from .states import State


class City(models.Model):
    state = models.ForeignKey(State, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    class Meta:
        ordering = ["state", "name"]
        verbose_name_plural = "Cities"
        verbose_name = "City"

    def __str__(self):
        return str(self.state) + " - " + str(self.name)
