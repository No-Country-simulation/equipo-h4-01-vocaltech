from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import PreguntaViewSet

router = DefaultRouter()
router.register(r'preguntas', PreguntaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]