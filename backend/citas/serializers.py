from datetime import datetime, time
from django.utils import timezone
from rest_framework import serializers
from .models import Cita

class CitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cita
        fields = '__all__'

    def validate(self, data):
        now = timezone.now()
        today = now.date()
        current_time = now.time()

        fecha = data.get('fecha', None)
        hora_inicio = data.get('hora_inicio', None)
        hora_fin = data.get('hora_fin', None)
        estado = data.get('estado', None)

        if fecha and fecha < today:
            raise serializers.ValidationError('La fecha no puede ser anterior a la fecha actual')
        if fecha == today and hora_inicio and hora_inicio < current_time:
            raise serializers.ValidationError('La hora de inicio no puede ser anterior a la hora actual')
        if hora_inicio and hora_fin and hora_inicio >= hora_fin:
            raise serializers.ValidationError('La hora de inicio debe ser anterior a la hora de fin')
        if hora_inicio and hora_inicio < time(8, 0, 0) or hora_fin and hora_fin > time(18, 0, 0):
            raise serializers.ValidationError('El horario de atención es de 8:00 a 18:00')
        if estado == 'CM' and fecha and fecha > today:
            raise serializers.ValidationError('No se puede completar una cita que aún no ha ocurrido')
        if estado == 'CA' and fecha and fecha < today:
            raise serializers.ValidationError('No se puede cancelar una cita que ya ha ocurrido')
        if estado == 'CA' and fecha == today and hora_inicio and hora_inicio < current_time:
            raise serializers.ValidationError('No se puede cancelar una cita que ya ha comenzado hoy')
        if 'motivo' in data and data['motivo'] == '':
            raise serializers.ValidationError('El motivo de la cita no puede estar vacío')

        return data
    
    def create(self, validated_data):
        return Cita.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.fecha = validated_data.get('fecha', instance.fecha)
        instance.hora_inicio = validated_data.get('hora_inicio', instance.hora_inicio)
        instance.hora_fin = validated_data.get('hora_fin', instance.hora_fin)
        instance.motivo = validated_data.get('motivo', instance.motivo)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.save()
        return instance