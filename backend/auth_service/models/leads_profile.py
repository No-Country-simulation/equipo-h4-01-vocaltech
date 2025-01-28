from django.db import models
from abstracts.models import AbstractModel
from catalogs.models.nationalities import Nationality
from catalogs.models.states import State
from catalogs.models.cities import City
from auth_service.models.users import User


class LeadsProfile(AbstractModel):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="leads_profile"
    )
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    photo = models.ImageField(upload_to="avatars/", blank=True, null=True)
    email = models.EmailField(max_length=100)
    birth_date = models.DateField(auto_now_add=True)
    nationality = models.ForeignKey(
        Nationality,
        on_delete=models.PROTECT,
        related_name="lead_country",
        blank=True,
        null=True,
    )
    state = models.ForeignKey(
        State,
        on_delete=models.PROTECT,
        related_name="lead_state",
        blank=True,
        null=True,
    )
    city = models.ForeignKey(
        City, on_delete=models.PROTECT, related_name="lead_city", blank=True, null=True
    )
    phone = models.CharField(max_length=20)

    class Meta:
        verbose_name = "Lead Profile"
        verbose_name_plural = "Lead Profiles"
        ordering = ["-created"]
        unique_together = ["user", "email"]
        indexes = [
            models.Index(fields=["email"]),
            models.Index(fields=["user", "email"]),
        ]

    def __str__(self):
        return f"{self.user.username} - {self.first_name} {self.last_name}"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
