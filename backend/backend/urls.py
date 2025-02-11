from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="API Documentation",
        default_version="v1",
        description="API documentation for the backend project",
    ),
    public=True,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    path("chat/", include("chat.urls")),
    path("api/", include("notifications.urls")),
    path("api-auth/", include("rest_framework.urls")),
    # path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    # path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/", include("catalogs.urls")),
    path("api/", include("auth_service.urls")),
    path("api/", include("citas.urls")),
    path("api/", include("airtable_bridge.urls")),
    path("api/", include("diagnosticos.urls")),
    path("docs/", include("docs.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
