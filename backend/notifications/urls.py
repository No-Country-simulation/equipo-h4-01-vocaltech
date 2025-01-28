from rest_framework.routers import DefaultRouter
from django.urls import path, include
from backend.routing import websocket_urlpatterns
from . import views

from notifications.viewsets.notifications import NotificationViewSet

router = DefaultRouter()
router.register(r"notifications", NotificationViewSet, basename="notification")
urlpatterns = [
    path("monitor/", views.notification, name="notification-monitor"),
    path("", include(router.urls)),
] + websocket_urlpatterns
