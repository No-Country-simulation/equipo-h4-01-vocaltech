from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets, filters
from rest_framework import status
from utils.pagination import StandardResultsSetPagination
from django_filters.rest_framework import DjangoFilterBackend
from .models import Question, SurveyResponse, LeadEmprendimiento
from .serializers import LeadEmprendimientoSerializer
import json


class LeadEmprendimientoViewSet(viewsets.ModelViewSet):
    queryset = LeadEmprendimiento.objects.all()
    serializer_class = LeadEmprendimientoSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['años', 'empleados']
    search_fields = ['nombre', 'ubicacion', 'sector', 'informacion']