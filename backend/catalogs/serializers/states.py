from rest_framework import serializers
from catalogs.models.states import State


class StateSerialzer(serializers.ModelSerializer):
    nationality_name = serializers.SerializerMethodField()

    class Meta:
        model = State
        fields = [
            "id",
            "name",
            "nationality",
            "nationality_name",
        ]

    def get_nationality_name(self, obj):
        return obj.nationality.name
