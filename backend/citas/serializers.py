from datetime import datetime, time, timedelta
from django.utils import timezone
from rest_framework import serializers
from .models import Cita
from auth_service.models import User
from utils.email import Email

class CitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cita
        fields = ['fecha', 'hora_inicio', 'motivo', 'lead', 'especialista', 'estado']

    def validate(self, data):
        now = timezone.now()
        today = now.date()
        current_time = now.time()

        fecha = data.get('fecha', None)
        hora_inicio = data.get('hora_inicio', None)
        estado = data.get('estado', None)
        lead = data.get('lead', None)
        especialista = data.get('especialista', None)

        if fecha and fecha < today:
            raise serializers.ValidationError('La fecha no puede ser anterior a la fecha actual')
        if fecha == today and hora_inicio and hora_inicio < current_time:
            raise serializers.ValidationError('La hora de inicio no puede ser anterior a la hora actual')
        if hora_inicio:
            hora_inicio_dt = datetime.combine(fecha, hora_inicio)
            hora_fin_dt = hora_inicio_dt + timedelta(minutes=30)
            hora_fin = hora_fin_dt.time()
            data['hora_fin'] = hora_fin
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
        if not User.objects.filter(id=especialista.id).exists():
            raise serializers.ValidationError('El especialista no existe')
        if not User.objects.filter(id=lead.id).exists():
            raise serializers.ValidationError('El lead no existe')
        if lead == especialista:
            raise serializers.ValidationError('El lead y el especialista no pueden ser la misma persona')
        if Cita.objects.filter(lead=lead, fecha=fecha, hora_inicio=hora_inicio).exists():
            raise serializers.ValidationError('Ya existe una cita agendada para el lead en la fecha y hora indicadas')

        return data
    
    def create(self, validated_data):
        lead_email = validated_data['lead'].email
        print(lead_email)
        Email.enviar_email_cita( # Asegúrate de que este sea el nombre correcto del template
            validated_data['lead'],
            validated_data['fecha'],
            validated_data['hora_inicio']
        )
        return Cita.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.fecha = validated_data.get('fecha', instance.fecha)
        instance.hora_inicio = validated_data.get('hora_inicio', instance.hora_inicio)
        instance.hora_fin = validated_data.get('hora_fin', instance.hora_fin)
        instance.motivo = validated_data.get('motivo', instance.motivo)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.lead = validated_data.get('lead', instance.lead)
        instance.especialista = validated_data.get('especialista', instance.especialista)
        instance.save()
        return instance