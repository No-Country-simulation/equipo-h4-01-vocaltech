from rest_framework import serializers
from .models import Pregunta

class PreguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pregunta
        fields = '__all__'

    def validate(self, attrs):
        tipo_pregunta = attrs.get('tipo_pregunta')
        opciones = attrs.get('opciones')
        peso = attrs.get('peso')

        if tipo_pregunta == 'abierta' and opciones:
            raise serializers.ValidationError('No se pueden agregar opciones a una pregunta abierta')
        if tipo_pregunta in ['Si/No', 'escala', 'multiple_choice'] and not opciones:
            raise serializers.ValidationError('Las preguntas cerradas deben tener opciones')
        if tipo_pregunta in ['Si/No', 'escala', 'multiple_choice'] and len(opciones) < 2:
            raise serializers.ValidationError('Las preguntas cerradas deben tener al menos 2 opciones')
        if tipo_pregunta in ['Si/No', 'escala', 'multiple_choice'] and len(opciones) > 5:
            raise serializers.ValidationError('Las preguntas cerradas no pueden tener más de 5 opciones')
        if tipo_pregunta in ['Si/No', 'escala', 'multiple_choice'] and len(set(opciones)) != len(opciones):
            raise serializers.ValidationError('Las opciones de una pregunta cerrada no pueden repetirse')
        
        if tipo_pregunta == 'escala':
            if sorted(opciones) != list(range(1, 6)):
                raise serializers.ValidationError('Las opciones para una pregunta de escala deben ser números consecutivos del 1 al 5')
        
        if tipo_pregunta == 'Si/No':
            if set(opciones) != {'Sí', 'No'}:
                raise serializers.ValidationError('Las opciones para una pregunta de Si/No deben ser "Sí" y "No"')
        
        if peso < 1 or peso > 4:
            raise serializers.ValidationError('El peso de la pregunta debe estar entre 1 y 4')

        return super().validate(attrs)