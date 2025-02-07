from rest_framework import serializers
from auth_service.models.leads_profile import LeadsProfile
from auth_service.models.roles import Role


class LeadsProfileSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    available_roles = serializers.SerializerMethodField()
    role = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all(),
        write_only=True,
    )

    class Meta:
        model = LeadsProfile
        fields = [
            "id",
            "user",
            "first_name",
            "last_name",
            "full_name",
            "photo",
            "nationality",
            "state",
            "city",
            "email",
            "birth_date",
            "notes",
            "phone",
            "available_roles",
            "role",
        ]
        read_only_fields = ["user", "is_active"]

    def get_available_roles(self, obj):
        roles = Role.objects.all()
        return [{"id": role.id, "name": role.name} for role in roles]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        user_role = instance.user.role
        representation["role"] = (
            {"id": user_role.id, "name": user_role.name} if user_role else None
        )
        return representation

    def update(self, instance, validated_data):
        role_data = validated_data.pop("role", None)

        if role_data:
            role_instance = Role.objects.get(id=role_data.id)
            if instance.user.role != role_instance:
                instance.user.role = role_instance
                instance.user.save()

        return super().update(instance, validated_data)
