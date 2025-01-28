from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings


# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )


urlpatterns = [
    path("admin/", admin.site.urls),
    path("chat/", include("chat.urls")),
    path("api/", include("notifications.urls")),
    path("api-auth/", include("rest_framework.urls")),
    # path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    # path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/", include("catalogs.urls")),
    path("api/", include("auth_service.urls")),
    path("api/", include("citas.urls")),
    path("docs/", include("docs.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
