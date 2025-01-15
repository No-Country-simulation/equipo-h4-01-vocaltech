from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers


User = get_user_model()


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "password",
        )

    def create(self, validated_data):
        user = User(
            username=validated_data["username"],
            email=validated_data["email"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        if username and password:
            username = authenticate(username=username, password=password)
            if username:
                if username.is_active:
                    data["username"] = username
                else:
                    raise serializers.ValidationError("Esta cuenta está desactivada")
            else:
                raise serializers.ValidationError(
                    "Imposible logearse con esas credenciales"
                )
        else:
            raise serializers.ValidationError("Debe incluir email y password")
        return data
