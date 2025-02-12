from django.contrib.auth.models import BaseUserManager
from django.utils.text import slugify


class UserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None, **extra_fields):
        if not email:
            raise ValueError("email must not be empty")
        if not first_name or not last_name:
            raise ValueError("The first name and last name must be provided")

        email = self.normalize_email(email)
        # username = self.generate_unique_username(first_name, last_name)
        user = self.model(
            email=email,
            first_name=first_name,
            last_name=last_name,
            **extra_fields,
        )
        user.set_password(password)
        user.username = self.generate_unique_username(first_name, last_name)
        user.save(using=self._db)
        return user

    def create_superuser(
        self, email, first_name, last_name, password=None, **extra_fields
    ):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("exported_to_airtable", False)
        if not extra_fields.get("is_staff"):
            raise ValueError("Superuser must have is_staff set to True")

        if not extra_fields.get("is_superuser"):
            raise ValueError("Superuser must have is_superuser set to True")

        return self.create_user(email, first_name, last_name, password, **extra_fields)

    def generate_unique_username(self, first_name, last_name):
        first_initial = first_name[0] if first_name else ""
        last_initial = last_name[0] if last_name else ""
        initials = f"{first_initial}{last_initial}"
        base_username = slugify(initials)
        username = base_username
        counter = 1
        while self.model.objects.filter(username=username).exists():
            suffix = str(counter)
            username = f"{base_username[:20- len(suffix)]}{suffix}"
            counter += 1
        return username
