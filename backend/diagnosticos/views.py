from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, status, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import SurveyResponse, LeadEmprendimiento
from .serializers import EncuestaSerializer, LeadEmprendimientoSerializer
from utils.pagination import StandardResultsSetPagination
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt


class LeadEmprendimientoViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = LeadEmprendimiento.objects.all()
    serializer_class = LeadEmprendimientoSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["años", "empleados"]
    search_fields = ["nombre", "ubicacion", "sector", "informacion"]


@method_decorator(csrf_exempt, name="dispatch")  # ✅ Aplica csrf_exempt correctamente
class RespuestaEncuesta(APIView):
    permission_classes = [AllowAny]

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
            survey_response = serializer.save()
            response_serializer = EncuestaSerializer(survey_response)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
