from rest_framework import viewsets
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from auth_service.models.roles import Role
from auth_service.serializers.roles import RoleSerializer, RoleDetailSerializer


class RoleViewSet(ReadOnlyModelViewSet):
    queryset = Role.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action in ["retrive"]:
            return RoleDetailSerializer
        return RoleSerializer

    @action(detail=False, methods=["get"])
    def list_roles(self, request):
        roles = Role.objects.all()
        serializer = self.get_serializer(roles, many=True)
        return Response(serializer.data)
