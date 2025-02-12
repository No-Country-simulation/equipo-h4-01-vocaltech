from rest_framework import serializers
from auth_service.models.roles import Role


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = [
            "id",
            "name",
            "notes",
        ]


class RoleDetailSerializer(serializers.ModelSerializer):
    class Meta:
        models = Role
        fields = "__all__"
        read_only_fields = [
            "is_active",
            "exported_to_airtable",
            "created_at",
            "updated_at",
        ]
