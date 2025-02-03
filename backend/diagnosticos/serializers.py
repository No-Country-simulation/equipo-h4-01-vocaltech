from rest_framework import serializers
from .models import LeadEmprendimiento, Question, AnswerOption, Recommendation, QuestionGroup, SurveyResponse
from auth_service.models import User
from utils.recommendation import generate_recommendations

class LeadEmprendimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadEmprendimiento
        fields = '__all__'

class RecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommendation
        fields = ["id", "answer_options", "text"]

class AnswerOptionSerializer(serializers.ModelSerializer):
    recommendations = RecommendationSerializer(many=True, required=False, write_only=True)

    class Meta:
        model = AnswerOption
        fields = ["id", "question", "text", "recommendations"]

class QuestionSerializer(serializers.ModelSerializer):
    options = AnswerOptionSerializer(many=True, read_only=True)
    group = serializers.CharField(source='group.name', read_only=True)

    class Meta:
        model = Question
        fields = ['text', 'options', 'group']

class EncuestaSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())  
    responses = serializers.JSONField()

    class Meta:
        model = SurveyResponse
        fields = ['user', 'responses', 'recommendations']
        read_only_fields = ['recommendations']

    def validate_responses(self, value):
        """Valida que las respuestas sean correctas según las preguntas disponibles."""
        question_ids = value.keys()
        questions = {q.id: q for q in Question.objects.filter(id__in=question_ids)}

        errors = {}

        for question_id, response in value.items():
            try:
                question_id = int(question_id)
            except ValueError:
                errors[question_id] = ["El ID de la pregunta debe ser un número entero."]
                continue

            question = questions.get(question_id)

            if not question:
                errors[question_id] = [f"La pregunta {question_id} no existe."]
                continue

            # Validamos las respuestas de preguntas con opciones (radio, checkbox, yes/no)
            if question.question_type in ["radio", "checkbox", "yes_no"]:
                if not isinstance(response, list):  # Unificamos el formato a lista para validación
                    response = [response]

                # Obtener las opciones de respuesta disponibles
                valid_options = list(question.options.all())
                valid_option_ids = {option.id for option in valid_options}

                # Convertimos índices a IDs cuando sea necesario
                converted_responses = []
                for r in response:
                    if isinstance(r, int) and r < len(valid_options):  
                        converted_responses.append(valid_options[r].id)  # Convertimos índice a ID
                    else:
                        converted_responses.append(r)  # Si ya es un ID, lo dejamos igual

                # Revisar si las respuestas están dentro de las opciones válidas
                invalid_options = [r for r in converted_responses if r not in valid_option_ids]
                if invalid_options:
                    errors[question_id] = [f"Las opciones {invalid_options} no son válidas para la pregunta {question_id}."]

        if errors:
            raise serializers.ValidationError(errors)

        return value

    def create(self, validated_data):
        """Genera la encuesta y sus recomendaciones antes de guardarla."""
        responses = validated_data["responses"]
        recommendations = generate_recommendations(responses)  # Generamos recomendaciones

        survey_response = SurveyResponse.objects.create(
            user=validated_data["user"],
            responses=responses,
            recommendations=recommendations  # Guardamos recomendaciones
        )
        return survey_response
