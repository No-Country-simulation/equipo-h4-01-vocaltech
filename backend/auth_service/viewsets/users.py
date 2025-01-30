from django.contrib.auth import login, logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from auth_service.serializers.users import (
    UserRegistrationSerializer,
    LoginSerializer,
)

from django.db import transaction
from notifications.services import NotificationService


# from rest_framework_simplejwt.tokens import RefreshToken


class UserRegistrationViewSet(viewsets.ModelViewSet):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]
    http_method_names = ["post"]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # send a notification
            with transaction.atomic():
                NotificationService.create_signup_notification(user)
            return Response(
                {
                    "message": "User crated successfully",
                    "user": UserRegistrationSerializer(user).data,
                    # "refresh": str(refresh),
                    # "access": str(access),
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginViewSet(viewsets.GenericViewSet):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=["post"], permission_classes=[AllowAny])
    def login(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]
        login(request, user)
        with transaction.atomic():
            NotificationService.create_login_notification(user)

        return Response(
            {
                "status": "success",
                "user": {
                    "email": user.email,
                    "username": user.username,
                    "role": user.role.name if user.role else None,
                },
            },
            status=status.HTTP_200_OK,
        )

    @method_decorator(csrf_exempt)
    @action(detail=False, methods=["post", "get"], permission_classes=[IsAuthenticated])
    def logout(self, request):
        logout(request)
        return Response(
            {
                "status": "success",
                "message": "You have been logged out",
            },
            status=status.HTTP_200_OK,
        )
