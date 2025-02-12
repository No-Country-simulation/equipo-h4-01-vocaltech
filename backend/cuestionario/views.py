from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from .models import Question, QuestionGroup
from .serializers import QuestionGroupSerializer


class QuestionViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = QuestionGroup.objects.all().order_by('id')
    serializer_class = QuestionGroupSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]

