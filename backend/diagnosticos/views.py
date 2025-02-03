from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, status, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import LeadEmprendimiento, Question, SurveyResponse, AnswerOption
from .serializers import EncuestaSerializer, LeadEmprendimientoSerializer, QuestionSerializer
from utils.pagination import StandardResultsSetPagination
from dal_select2.views import Select2QuerySetView
from django.views.decorators.csrf import csrf_exempt


class QuestionViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Question.objects.all().order_by('group', 'id')
    serializer_class = QuestionSerializer



class LeadEmprendimientoViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = LeadEmprendimiento.objects.all()
    serializer_class = LeadEmprendimientoSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['años', 'empleados']
    search_fields = ['nombre', 'ubicacion', 'sector', 'informacion']


class RespuestaEncuesta(APIView):
    permission_classes = [AllowAny]
    @csrf_exempt
    def get(self, request, id=None):
        if id:
            survey_response = SurveyResponse.objects.get(id=id)
            serializer = EncuestaSerializer(survey_response)
            return Response(serializer.data)
        else:
            survey_responses = SurveyResponse.objects.all()
            serializer = EncuestaSerializer(survey_responses, many=True)
            return Response(serializer.data)

    @csrf_exempt
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
