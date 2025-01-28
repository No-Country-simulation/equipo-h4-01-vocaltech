from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import get_entrepreneur_survey, process_survey, LeadEmprendimientoViewSet
from django.conf.urls.static import static
from django.conf import settings

router = DefaultRouter()
router.register(r'lead-bussines', LeadEmprendimientoViewSet)

urlpatterns = [
    path('survey/entrepreneur/questions/', get_entrepreneur_survey, name='get_entrepreneur_survey'),
    path('survey/entrepreneur/process/', process_survey, name='process_entrepreneur_survey'),
    path('', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
