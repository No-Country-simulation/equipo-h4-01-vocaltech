from rest_framework import viewsets, mixins, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from auth_service.serializers.leads_profile import LeadsProfileSerializer
from auth_service.models.leads_profile import LeadsProfile
from notifications.services import NotificationService
from rest_framework.exceptions import NotFound, PermissionDenied


class LeadsProfileViewSet(
    mixins.UpdateModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
):
    queryset = LeadsProfile.objects.all()
    serializer_class = LeadsProfileSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = [
        "put",
        "patch",
        "get",
    ]

    def get_queryset(self):
        return LeadsProfile.objects.filter(user=self.request.user)

    def get_object(self):
        obj = super().get_object()
        if obj.user != self.request.user:
            raise PermissionDenied("You cannot access this profile")
        return obj

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        # instance = self.get_queryset().filter(id=kwargs.get("pk")).first()

        # if instance is None:
        #     raise NotFound(detail="LeadsProfile not found")

        # if not instance:
        #     return Response({"detail": "Not found"}, status=404)
        # serializer = self.get_serializer(instance)

        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        # Update the user's profile
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=kwargs.get("partial", False)
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        NotificationService.create_updated_leads_profile(self.request.user)

        return Response(serializer.data)

    def safe_get_object(self):
        instance = self.get_queryset().first()
        if not instance:
            raise NotFound("Leads profile not found for the current user.")
        return instance

    def method_not_allowed(self):
        return Response(
            {"detail": "This action is not allowed on this endpoint."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )

    def create(self, request, *args, **kwargs):
        return self.method_not_allowed()

    def destroy(self, request, *args, **kwargs):
        return self.method_not_allowed()

    def list(self, request, *args, **kwargs):
        return self.method_not_allowed()

    def handle_exception(self, exc):
        if isinstance(exc, NotFound):
            return Response(
                {"error": "Leads profile not found for the current user."},
                status=status.HTTP_404_NOT_FOUND,
            )
        elif isinstance(exc, PermissionDenied):
            return Response(
                {"error": "You don't have permission to access this profile."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().handle_exception(exc)
