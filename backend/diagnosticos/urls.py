from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LeadEmprendimientoViewSet, QuestionViewSet, RespuestaEncuesta
from django.conf.urls.static import static
from django.conf import settings

router = DefaultRouter()
router.register(r'lead-business', LeadEmprendimientoViewSet)
router.register(r'questions', QuestionViewSet)

urlpatterns = [
    path('encuestas/procesar', RespuestaEncuesta.as_view(), name='process_entrepreneur_survey'),
    path('', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
