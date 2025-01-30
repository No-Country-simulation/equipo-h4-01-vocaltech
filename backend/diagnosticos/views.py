from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, filters, status
from utils.pagination import StandardResultsSetPagination
from django_filters.rest_framework import DjangoFilterBackend
from .models import Question, SurveyResponse, LeadEmprendimiento
from .serializers import LeadEmprendimientoSerializer, QuestionSerializer, EncuestaSerializer
from utils.recommendation import generar_recomendaciones_hibridas


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all().order_by('group', 'id')
    serializer_class = QuestionSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['text', 'category']


class LeadEmprendimientoViewSet(viewsets.ModelViewSet):
    queryset = LeadEmprendimiento.objects.all()
    serializer_class = LeadEmprendimientoSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['años', 'empleados']
    search_fields = ['nombre', 'ubicacion', 'sector', 'informacion']


class RespuestaEncuesta(APIView):
    def get(self, request, id=None):
        if id:
            survey_response = SurveyResponse.objects.get(id=id)
            serializer = EncuestaSerializer(survey_response)
            return Response(serializer.data)
        else:
            survey_responses = SurveyResponse.objects.all()
            serializer = EncuestaSerializer(survey_responses, many=True)
            return Response(serializer.data)

    def post(self, request):
        serializer = EncuestaSerializer(data=request.data)
        if serializer.is_valid():
            # Crear la instancia de SurveyResponse con las recomendaciones
            survey_response = serializer.save()
            
            # Serializar la instancia creada
            response_serializer = EncuestaSerializer(survey_response)
            
            # Devolver la respuesta con los datos serializados
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        
        # Devolver los errores de validación
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)