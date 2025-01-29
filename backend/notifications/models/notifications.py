from django.db import models
from auth_service.models.users import User
from abstracts.models import AbstractModel


# Create your models here.
class Notification(AbstractModel):
    NOTIFICATION_TYPES = [
        ("info", "Info"),
        ("warning", "Warning"),
        ("success", "Success"),
        ("error", "Error"),
    ]

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="notifications"
    )
    message = models.TextField()
    notification_type = models.CharField(
        max_length=20, choices=NOTIFICATION_TYPES, default="info"
    )
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.email} - {self.notification_type}: {self.message[:30]}"

    class Meta:
        db_table = "notifications"
        verbose_name = "Notification"
        verbose_name_plural = "Notifications"
