from rest_framework import viewsets, mixins, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from auth_service.serializers.leads_profile import LeadsProfileSerializer
from auth_service.models.leads_profile import LeadsProfile
from notifications.services import NotificationService


class LeadsProfileViewSet(
    mixins.UpdateModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
):
    queryset = LeadsProfile.objects.all()
    serializer_class = LeadsProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return LeadsProfile.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_queryset().first()
        if not instance:
            return Response({"detail": "Not found"}, status=404)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        # Update the user's profile
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=kwargs.get("partial", False)
        )
        serializer.is_valid(raise_exception=True)
        if serializer.save():
            NotificationService.create_updated_leads_profile(self.request.user)

        return Response(serializer.data)
