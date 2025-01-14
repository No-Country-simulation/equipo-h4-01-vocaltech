from django.db import models
from abstracts.models import AbstractModel


class Role(AbstractModel):
    name = models.CharField(max_length=100)

    class Meta:
        db_table = "roles"

    def __str__(self):
        return self.name
