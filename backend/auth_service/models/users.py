from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from ..managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=200, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    role = models.OneToOneField(
        "auth_service.Role",
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        related_name="user",
    )

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        "username",
    ]

    def __str__(self):
        return str(self.username)

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    class Meta:
        db_table = "users"
