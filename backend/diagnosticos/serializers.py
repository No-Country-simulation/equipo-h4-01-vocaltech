from rest_framework import serializers
from .models import LeadEmprendimiento, Question, SurveyResponse
from mutagen import File
from mutagen.wave import WAVE
from mutagen.mp3 import MP3
from mutagen.flac import FLAC
from mutagen.oggvorbis import OggVorbis
import json
from auth_service.models import User

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

        if question_type in ['text', 'number'] and options:
            raise serializers.ValidationError(f'Las preguntas de tipo {question_type} no pueden tener opciones.')
        
        if question_type in ['radio', 'checkbox']:
            if not options:
                raise serializers.ValidationError(f'Las preguntas de tipo {question_type} deben tener opciones.')
            for option in options:
                if 'text' not in option or 'value' not in option:
                    raise serializers.ValidationError('Las opciones deben tener campos de texto y valor.')
            if len(set(option['text'] for option in options)) != len(options):
                raise serializers.ValidationError('Las opciones no pueden repetirse.')

        return data
    
    def create(self, validated_data):
        if validated_data['question_type'] == 'yes_no':
            validated_data['options'] = [{'text': 'Sí', 'value': 1}, {'text': 'No', 'value': 0}]
        return Question.objects.create(**validated_data)

class EncuestaSerializer(serializers.Serializer):
    responses = serializers.JSONField()

    def validate(self, data):
        payload = data['answers']
        question = list(payload.keys())
        answer = list(payload.values())

        if len(question) != len(answer):
            raise serializers.ValidationError('El número de preguntas y respuestas no coincide.')
        if len(question) == 0:
            raise serializers.ValidationError('No se han proporcionado respuestas.')
        if len(answer) == 0:
            raise serializers.ValidationError('No se han proporcionado respuestas a las preguntas.')
        
        for q in question:
            if not q.isnumeric():
                raise serializers.ValidationError('Las preguntas deben ser números enteros.')
            if int(q) < 0:
                raise serializers.ValidationError('Las preguntas no pueden ser negativas.')
            if Question.objects.filter(id=q).count() == 0:
                raise serializers.ValidationError(f'La pregunta {q} no existe.')
            if Question.objects.get(id=q).question_type == 'number':
                if not answer[q].isnumeric():
                    raise serializers.ValidationError(f'La respuesta a la pregunta {q} debe ser un número entero.')
                if int(answer[q]) < 0:
                    raise serializers.ValidationError(f'La respuesta a la pregunta {q} no puede ser negativa.')
            if Question.objects.get(id=q).question_type == 'yes_no':
                raise serializers.ValidationError(f'La pregunta {q} no puede ser de tipo Sí/No.')
            if Question.objects.get(id=q).question_type == 'text':
                if answer[q] == '':
                    raise serializers.ValidationError(f'La respuesta a la pregunta {q} no puede estar vacía.')
            if Question.objects.get(id=q).question_type == 'radio':
                if not answer[q].isnumeric():
                    raise serializers.ValidationError(f'La respuesta a la pregunta {q} debe ser un número entero.')
                if int(answer[q]) < 0:
                    raise serializers.ValidationError(f'La respuesta a la pregunta {q} no puede ser negativa.')
                if int(answer[q]) >= len(Question.objects.get(id=q).options):
                    raise serializers.ValidationError(f'La respuesta a la pregunta {q} no es válida.')
            if Question.objects.get(id=q).question_type == 'checkbox':
                if not isinstance(answer[q], list):
                    raise serializers.ValidationError(f'La respuesta a la pregunta {q} debe ser una lista.')
                for a in answer[q]:
                    if not a.isnumeric():
                        raise serializers.ValidationError(f'Las respuestas a la pregunta {q} deben ser números enteros.')
                    if int(a) < 0:
                        raise serializers.ValidationError(f'Las respuestas a la pregunta {q} no pueden ser negativas.')
                    if int(a) >= len(Question.objects.get(id=q).options):
                        raise serializers.ValidationError(f'Las respuestas a la pregunta {q} no son válidas.')
        return data


class EncuestaSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    answers = serializers.JSONField()

    def validate_user_id(self, value):
        if not User.objects.filter(id=value).exists():
            raise serializers.ValidationError('Usuario no encontrado.')
        return value

    def validate_answers(self, value):
        # Obtener todas las preguntas relacionadas
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
        else:
            raise serializers.ValidationError(f'Tipo de pregunta no soportado: {question.question_type}')

    def validate_text_response(self, question, response):
        if not isinstance(response, str) or not response.strip():
            raise serializers.ValidationError('La respuesta no puede estar vacía.')

    def validate_number_response(self, question, response):
        if not isinstance(response, int) or response < 0:
            raise serializers.ValidationError('La respuesta debe ser un número entero no negativo.')

    def validate_yes_no_response(self, question, response):
        if response not in [0, 1]:
            raise serializers.ValidationError('La respuesta debe ser 0 (No) o 1 (Sí).')

    def validate_radio_response(self, question, response):
        if response not in [option['value'] for option in question.options]:
            raise serializers.ValidationError('La respuesta no es válida para esta pregunta.')

    def validate_checkbox_response(self, question, response):
        if not isinstance(response, list):
            raise serializers.ValidationError('La respuesta debe ser una lista.')
        invalid = [r for r in response if r not in [option['value'] for option in question.options]]
        if invalid:
            raise serializers.ValidationError(f'Las opciones {invalid} no son válidas.')
