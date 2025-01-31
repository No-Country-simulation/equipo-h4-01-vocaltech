from rest_framework import filters
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from catalogs.models.nationalities import Nationality
from catalogs.serializers.nationalities import NationalitySerializer


class NationalityViewSet(ReadOnlyModelViewSet):
    queryset = Nationality.objects.all()
    serializer_class = NationalitySerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    search_fields = ["nombre", "name", "nom"]
    ordering_fields = ["nombre", "name", "nom"]
