from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Cita
from .serializers import CitaSerializer
from rest_framework.pagination import PageNumberPagination

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class CitaViewSet(viewsets.ModelViewSet):
    queryset = Cita.objects.all().order_by('fecha')
    serializer_class = CitaSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['fecha', 'estado']
    search_fields = ['motivo']

    @action(detail=True, methods=['patch'])
    def actualizar_cita(self, request, pk=None):
        cita = self.get_object()
        serializer = self.get_serializer(cita, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response_data = {'status': 'cita actualizada'}
            if 'estado' in serializer.validated_data:
                response_data['nuevo_estado'] = serializer.data['estado']
            if 'fecha' in serializer.validated_data:
                response_data['nueva_fecha'] = serializer.data['fecha']
            if 'hora_inicio' in serializer.validated_data:
                response_data['nueva_hora_inicio'] = serializer.data['hora_inicio']
            if 'hora_fin' in serializer.validated_data:
                response_data['nueva_hora_fin'] = serializer.data['hora_fin']
            if 'motivo' in serializer.validated_data:
                response_data['nuevo_motivo'] = serializer.data['motivo']
            return Response(response_data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)