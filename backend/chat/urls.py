from django.urls import path
from . import views
from backend.routing import websocket_urlpatterns

urlpatterns = [
    path("", views.chat),
] + websocket_urlpatterns
