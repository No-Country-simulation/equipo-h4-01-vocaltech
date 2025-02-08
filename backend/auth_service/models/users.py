from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from ..managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    username = models.CharField(max_length=20, unique=True, blank=True, null=True)
    email = models.EmailField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    role = models.ForeignKey(
        "auth_service.Role",
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        related_name="users",
    )

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        "first_name",
        "last_name",
    ]

    class Meta:
        db_table = "users"

    def __str__(self):
        return str(self.username)

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    def save(self, *args, **kwargs):
        if not self.username:
            self.username = User.objects.generate_unique_username(
                self.first_name, self.last_name
            )
        super().save(*args, **kwargs)
