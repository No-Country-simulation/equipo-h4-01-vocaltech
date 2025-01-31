from django.apps import AppConfig


class AuthServicesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "auth_service"

    def ready(self):
        import auth_service.signals
