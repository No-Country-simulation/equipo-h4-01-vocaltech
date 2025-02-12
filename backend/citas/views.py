from rest_framework import viewsets, status, filters
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Cita
from .serializers import CitaSerializer
from utils.pagination import StandardResultsSetPagination


class CitaViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Cita.objects.all().order_by('fecha')
    serializer_class = CitaSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['fecha', 'estado']
    search_fields = ['motivo']
