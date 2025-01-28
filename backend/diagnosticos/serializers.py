from rest_framework import serializers
from .models import LeadEmprendimiento
from mutagen import File
from mutagen.wave import WAVE
from mutagen.mp3 import MP3
from mutagen.flac import FLAC
from mutagen.oggvorbis import OggVorbis

class LeadEmprendimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadEmprendimiento
        fields = '__all__'

    def validate(self, data):
        if data['empleados'] < 0:
            raise serializers.ValidationError("El número de empleados no puede ser negativo")
        if data['años'] < 0:
            raise serializers.ValidationError("El número de años no puede ser negativo")
        if data['nombre'] == "":
            raise serializers.ValidationError("El nombre no puede estar vacío")
        if data['ubicacion'] == "":
            raise serializers.ValidationError("La ubicación no puede estar vacía")
        if data['sector'] == "":
            raise serializers.ValidationError("El sector no puede estar vacío")
        if data['informacion'] == "":
            raise serializers.ValidationError("La información no puede estar vacía")
        
        # Audio file validation
        audio_file = data['audio']
        try:
            audio = File(audio_file)
            if audio is None:
                raise serializers.ValidationError("No se pudo procesar el archivo de audio.")
        except Exception as e:
            raise serializers.ValidationError(f"No se pudo procesar el archivo de audio: {str(e)}")
        
        # Verificar el tipo de archivo y obtener la duración
        if isinstance(audio, (WAVE, MP3, FLAC, OggVorbis)):
            duration = audio.info.length  # Duración en segundos
        else:
            raise serializers.ValidationError("Formato de archivo de audio no soportado.")
        
        # Validar duración
        if duration < 30 or duration > 60:
            raise serializers.ValidationError("La duración del audio debe estar entre 30 y 60 segundos.")
        
        return data
