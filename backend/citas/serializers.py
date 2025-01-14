from restframework import serializers
from .models import Cita

class CitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cita
        fields = '__all__'

    def validate(self, data):
        if data['fecha'] < timezone.now():
            raise serializers.ValidationError("La fecha de la cita no puede ser anterior a la fecha actual")
        if data['fecha'] < timezone.now() + timedelta(days=1):
            raise serializers.ValidationError("La cita debe ser programada con al menos un día de anticipación")
        if data['fecha'].weekday() == 5 or data['fecha'].weekday() == 6:
            raise serializers.ValidationError("La cita debe ser programada en un día laboral")
        if data['fecha'].hour < 8 or data['fecha'].hour > 17:
            raise serializers.ValidationError("La cita debe ser programada en un horario laboral")
        return data