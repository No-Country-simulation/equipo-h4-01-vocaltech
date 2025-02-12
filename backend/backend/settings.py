from pathlib import Path
import environ
import os
from django.templatetags.static import static
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _

env = environ.Env()
environ.Env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-k9gw($iaq*hvj(1h^%m#3ni@%2ox5a(8fftsxmn5rpkhwzmst4"

# SECURITY WARNING: don't run with debug turned on in production!
PROD = os.environ.get("PROD", "False").lower() in ("true", "1", "t")
DEBUG = not PROD

ALLOWED_HOSTS = []
OPEN_API_KEY = os.getenv("OPEN_API_KEY")

# Application definition

INSTALLED_APPS = [
    "daphne",
    "channels",
    "unfold",  # before django.contrib.admin
    "unfold.contrib.filters",  # optional, if special filters are needed
    "unfold.contrib.forms",  # optional, if special form elements are needed
    "unfold.contrib.inlines",  # optional, if special inlines are needed
    "unfold.contrib.import_export",  # optional, if django-import-export package is used
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django_extensions",
    "corsheaders",
    # Third party libraries
    "rest_framework",
    "import_export",
    "django_filters",
    "drf_spectacular",
    "drf_yasg",
    # Custom apps
    "auth_service",
    "docs",
    "notifications",
    "chat",
    "catalogs",
    "citas",
    "airtable_bridge",
    "chat_bot",
    "diagnosticos",
    "cuestionario",
]

AUTH_USER_MODEL = "auth_service.User"

REST_FRAMEWORK = {
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.BasicAuthentication",
        # "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",  # Require authentication for all views
    ],
    "DEFAULT_RENDERER_CLASSES": (
        "rest_framework.renderers.JSONRenderer",
        "rest_framework.renderers.BrowsableAPIRenderer",
    ),
    "DEFAULT_FILTER_BACKENDS": ["django_filters.rest_framework.DjangoFilterBackend"],
}


CSRF_TRUSTED_ORIGINS = [
    "http://localhost:8000",
]

CORS_ALLOW_ALL_ORIGINS = True

CORS_ALLOW_CREDENTIALS = False

ASGI_APPLICATION = "backend.asgi.application"

DAPHNE_SERVE_STATIC = True

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    # "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("127.0.0.1", 6379)],
        },
    },
}

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            os.path.join(BASE_DIR, "templates")
        ],  # Asegúrate de que esta ruta esté configurada
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# WSGI_APPLICATION = "backend.wsgi.application"

# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

AUTH_USER_MODEL = "auth_service.User"


DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": env("DB_NAME"),
        "USER": env("DB_USER"),
        "PASSWORD": env("DB_PASSWORD"),
        "HOST": env("DB_HOST"),
        "PORT": env("DB_PORT"),
    }
}

# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.sqlite3",
#         "NAME": BASE_DIR / "db.sqlite3",
#     }
# }

# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = "es-mx"

TIME_ZONE = "America/Mexico_City"

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = "/static/"
STATICFILES_DIRS = [BASE_DIR / "static"]
STATIC_ROOT = BASE_DIR / "staticfiles"

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# Configuración de correo para MailHog en entorno de desarrollo
# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = 'localhost'
# EMAIL_PORT = 1025
# EMAIL_USE_TLS = False
# EMAIL_USE_SSL = False
# DEFAULT_FROM_EMAIL = 'no-reply@example.com'


# Gmail SMTP (solo en produccion)
# EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
# EMAIL_HOST = "smtp.gmail.com"
# EMAIL_PORT = 587
# EMAIL_USE_TLS = True
# EMAIL_HOST_USER = "leanmsan@gmail.com"
# EMAIL_HOST_PASSWORD = "kqdz zobj gjsq wsvj"


# Looking to send emails in production? Check out our Email API/SMTP product!
# EMAIL_HOST = 'sandbox.smtp.mailtrap.io'
# EMAIL_HOST_USER = '8f0c828b38649a'
# EMAIL_HOST_PASSWORD = '0a919db8128a72'
# EMAIL_PORT = '2525'

UNFOLD = {
    "SITE_TITLE": "Administración Vocaltech",
    "SITE_HEADER": "Administración Vocaltech",
    "SHOW_HISTORY": False, # show/hide "History" button, default: True
    "SHOW_VIEW_ON_SITE": False, # show/hide "View on site" button, default: True
    "SHOW_BACK_BUTTON": True, # show/hide "Back" button on changeform in header, default: False
    "SITE_URL": "/admin/",
     "SITE_LOGO": {
        "light": lambda request: static("img/vocaltech-logo.svg"),  # light mode
        "dark": lambda request: static("img/vocaltech-logo-white.svg"),  # dark mode
    },
     "SITE_FAVICONS": [
        {
            "rel": "icon",
            "sizes": "32x32",
            "type": "image/svg+xml",
            "href": lambda request: static("img/vocaltech-icon.svg"),
        },
    ],
    "THEME": "light",  # light/dark
    "LOGIN": {
        "image": lambda request: static("img/vocaltech-bienvenida.png"),
    },
    "SIDEBAR": {
        "show_search": True,  # Search in applications and models names
        "show_all_applications": False,  # Dropdown with all applications and models
        "navigation": [
            {
                "title": _("Usuarios y Autenticación"),
                "separator": True,
                "items": [
                    {"title": _("Usuarios"), "icon": "people", "link": reverse_lazy("admin:auth_service_user_changelist")},
                    {"title": _("Roles"), "icon": "admin_panel_settings", "link": reverse_lazy("admin:auth_service_role_changelist")},
                    {"title": _("Perfiles de Leads"), "icon": "person", "link": reverse_lazy("admin:auth_service_leadsprofile_changelist")},
                ],
            },
            {
                "title": _("Catalogs"),
                "separator": True,
                "items": [
                    {"title": _("Cities"), "icon": "location_city", "link": reverse_lazy("admin:catalogs_city_changelist")},
                    {"title": _("Nationalities"), "icon": "flag", "link": reverse_lazy("admin:catalogs_nationality_changelist")},
                    {"title": _("States"), "icon": "public", "link": reverse_lazy("admin:catalogs_state_changelist")},
                ],
            },
            {
                "title": _("Formularios de Diagnósticos"),
                "separator": True,
                "items": [
                    {"title": _("Grupos de Preguntas"), "icon": "list", "link": reverse_lazy("admin:cuestionario_questiongroup_changelist")},
                    {"title": _("Subgrupos de Preguntas"), "icon": "subtitles", "link": reverse_lazy("admin:cuestionario_questionsubgroup_changelist")},
                    {"title": _("Preguntas"), "icon": "quiz", "link": reverse_lazy("admin:cuestionario_question_changelist")},
                    {"title": _("Recomendaciones"), "icon": "thumb_up", "link": reverse_lazy("admin:cuestionario_recommendation_changelist")},
                    {"title": _("Servicios"), "icon": "room_service", "link": reverse_lazy("admin:cuestionario_service_changelist")},
                ],
            },
            {
                "title": _("Diagnósticos"),
                "separator": True,
                "items": [
                    {"title": _("Datos Emprendimientos"), "icon": "business", "link": reverse_lazy("admin:diagnosticos_leademprendimiento_changelist")},
                    {"title": _("Diagnósticos Respondidos"), "icon": "assignment", "link": reverse_lazy("admin:diagnosticos_surveyresponse_changelist")},
                ],
            },
        ]
    },
    
}