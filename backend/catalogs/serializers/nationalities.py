from rest_framework import serializers
from catalogs.models.nationalities import Nationality


class NationalitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Nationality
        fields = "__all__"
