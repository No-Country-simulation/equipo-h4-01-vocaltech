from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers
from auth_service.models.roles import Role

User = get_user_model()


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all(),
        required=True,
    )
    role_name = serializers.PrimaryKeyRelatedField(source="role.name", read_only=True)

    class Meta:
        model = User
        fields = (
            "username",
            "first_name",
            "last_name",
            "email",
            "password",
            "role",
            "role_name",
        )
        read_only_fields = ["username"]

    def create(self, validated_data):
        user = User(
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            email=validated_data["email"],
        )
        user.set_password(validated_data["password"])
        user.role = validated_data["role"]
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")
        if email and password:
            user = authenticate(
                request=self.context.get("request"),
                email=email,
                password=password,
            )
            if not user:
                raise serializers.ValidationError("No credentials were provided.")

            if not user.is_active:
                raise serializers.ValidationError("Imposible logearse")
        else:
            raise serializers.ValidationError("Must include email and password")

        data["user"] = user

        return data
