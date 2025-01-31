from rest_framework import viewsets
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
from catalogs.models.states import State
from catalogs.serializers.states import StateSerialzer


class StateViewSet(ReadOnlyModelViewSet):
    queryset = State.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        return StateSerialzer
