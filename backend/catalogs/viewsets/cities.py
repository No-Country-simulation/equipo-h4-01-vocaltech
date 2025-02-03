from rest_framework import viewsets
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
from catalogs.models.cities import City
from catalogs.serializers.cities import CitySerialzer


class CityViewSet(ReadOnlyModelViewSet):
    queryset = City.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        return CitySerialzer
