from django.urls import path
from .views import get_entrepreneur_survey, process_entrepreneur_survey

urlpatterns = [
    path('survey/entrepreneur/questions/', get_entrepreneur_survey, name='get_entrepreneur_survey'),
    path('survey/entrepreneur/process/', process_entrepreneur_survey, name='process_entrepreneur_survey'),
]
