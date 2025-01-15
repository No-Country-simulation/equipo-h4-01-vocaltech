from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from auth_service.serializers.users import UserRegistrationSerializer, LoginSerializer

# from rest_framework_simplejwt.tokens import RefreshToken


class UserRegistrationViewSet(viewsets.ModelViewSet):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]
    http_method_names = ["post"]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # generate JWT token
            # refresh = RefreshToken.for_user(user)
            # access = refresh.access_token
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


class LoginViewSet(viewsets.ViewSet):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]
    http_method_names = ["post"]

    def create(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["username"]
            if user:
                # refresh = RefreshToken.for_user(user)
                # access = refresh.access_token
                return Response(
                    # {
                    #     "refresh": str(refresh),
                    #     "access": str(access),
                    # },
                    status=status.HTTP_200_OK,
                )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )
