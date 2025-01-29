from rest_framework import serializers
from catalogs.models.cities import City


class CitySerialzer(serializers.ModelSerializer):
    state_name = serializers.CharField(source="state.name")
    nationality = serializers.SerializerMethodField()

    class Meta:
        model = City
        fields = [
            "id",
            "name",
            "state",
            "state_name",
            "nationality",
        ]

    def get_nationality(self, obj):

        return (
            {"id": obj.state.nationality.id, "name": obj.state.nationality.name}
            if obj.state and obj.state.nationality.name
            else None
        )
