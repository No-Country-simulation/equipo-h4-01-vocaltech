from rest_framework import serializers
from .models import LeadEmprendimiento, Question, SurveyResponse
from mutagen import File
from mutagen.wave import WAVE
from mutagen.mp3 import MP3
from mutagen.flac import FLAC
from mutagen.oggvorbis import OggVorbis
import json
from auth_service.models import User
from utils.recommendation import generar_recomendaciones_hibridas
from utils.email import Email

class LeadEmprendimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadEmprendimiento
        fields = '__all__'

    def validate(self, data):
        if data['empleados'] < 0:
            raise serializers.ValidationError('El número de empleados no puede ser negativo')
        if data['años'] < 0:
            raise serializers.ValidationError('El número de años no puede ser negativo')
        if data['nombre'] == '':
            raise serializers.ValidationError('El nombre no puede estar vacío')
        if data['ubicacion'] == '':
            raise serializers.ValidationError('La ubicación no puede estar vacía')
        if data['sector'] == '':
            raise serializers.ValidationError('El sector no puede estar vacío')
        if data['informacion'] == '':
            raise serializers.ValidationError('La información no puede estar vacía')
        
        # Audio file validation
        audio_file = data['audio']
        try:
            audio = File(audio_file)
            if audio is None:
                raise serializers.ValidationError('No se pudo procesar el archivo de audio.')
        except Exception as e:
            raise serializers.ValidationError(f'No se pudo procesar el archivo de audio: {str(e)}')
        
        # Verificar el tipo de archivo y obtener la duración
        if isinstance(audio, (WAVE, MP3, FLAC, OggVorbis)):
            duration = audio.info.length  # Duración en segundos
        else:
            raise serializers.ValidationError('Formato de archivo de audio no soportado.')
        
        # Validar duración
        if duration < 30 or duration > 60:
            raise serializers.ValidationError('La duración del audio debe estar entre 30 y 60 segundos.')
        
        return data


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

    def validate(self, data):
        question_type = data.get('question_type')
        options = data.get('options', [])
        
        if question_type in ['radio', 'checkbox', 'number']:
            if not options:
                raise serializers.ValidationError(f'Las preguntas de tipo {question_type} deben tener opciones.')
            for option in options:
                if 'text' not in option or 'value' not in option:
                    raise serializers.ValidationError('Las opciones deben tener campos de texto y valor.')
            if len(set(option['text'] for option in options)) != len(options):
                raise serializers.ValidationError('Las opciones no pueden repetirse.')
        
        return data
    
    def create(self, validated_data):
        return Question.objects.create(**validated_data)


class EncuestaSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())  
    responses = serializers.JSONField()

    class Meta:
        model = SurveyResponse
        fields = ['user', 'responses', 'recommendations']
        read_only_fields = ['recommendations']

    def validate_responses(self, value):
        question_ids = value.keys()
        questions = {q.id: q for q in Question.objects.filter(id__in=question_ids)}

        errors = {}
        for question_id, response in value.items():
            question = questions.get(int(question_id))
            if not question:
                errors[question_id] = f'La pregunta {question_id} no existe.'
                continue

            try:
                self.validate_response(question, response)
            except serializers.ValidationError as e:
                errors[question_id] = e.detail

        if errors:
            raise serializers.ValidationError(errors)

        return value

    def create(self, validated_data):
        user = validated_data['user'] 
        answers = validated_data['responses']

        # Generar recomendaciones
        recomendaciones = generar_recomendaciones_hibridas(answers)

        # Crear la instancia de SurveyResponse con el objeto User
        survey_response = SurveyResponse.objects.create(
            user=user,  # ✅ Ahora pasamos el objeto `User` en lugar de su ID
            responses=answers,
            recommendations=recomendaciones
        )
        Email.enviar_email_diagnotico(user.id, recomendaciones)
        return survey_response

    def validate_response(self, question, response):
        validators = {
            'text': self.validate_text_response,
            'number': self.validate_number_response,
            'yes_no': self.validate_yes_no_response,
            'radio': self.validate_radio_response,
            'checkbox': self.validate_checkbox_response,
        }
        validator = validators.get(question.question_type)
        if validator:
            validator(question, response)

    def validate_text_response(self, question, response):
        if not isinstance(response, str) or response.strip() == "":
            raise serializers.ValidationError(f"La respuesta a la pregunta {question.id} no puede estar vacía.")

    def validate_number_response(self, question, response):
        try:
            response = int(response)
            if response < 0:
                raise serializers.ValidationError(f"La respuesta a la pregunta {question.id} no puede ser negativa.")
        except ValueError:
            raise serializers.ValidationError(f"La respuesta a la pregunta {question.id} debe ser un número entero.")

    def validate_yes_no_response(self, question, response):
        if response not in [0, 1]:
            raise serializers.ValidationError(f"La respuesta a la pregunta {question.id} debe ser 0 (No) o 1 (Sí).")

    def validate_radio_response(self, question, response):
        try:
            response = int(response)
            if response < 0 or response >= len(question.options):
                raise serializers.ValidationError(f"La respuesta a la pregunta {question.id} no es válida.")
        except ValueError:
            raise serializers.ValidationError(f"La respuesta a la pregunta {question.id} debe ser un número entero.")

    def validate_checkbox_response(self, question, response):
        if not isinstance(response, list):
            raise serializers.ValidationError(f"La respuesta a la pregunta {question.id} debe ser una lista.")
        for r in response:
            try:
                r = int(r)
                if r < 0 or r >= len(question.options):
                    raise serializers.ValidationError(f"Las respuestas a la pregunta {question.id} no son válidas.")
            except ValueError:
                raise serializers.ValidationError(f"Las respuestas a la pregunta {question.id} deben ser números enteros.")
