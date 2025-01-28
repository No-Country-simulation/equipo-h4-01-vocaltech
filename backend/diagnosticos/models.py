from django.db import models
from auth_service.models import User

class Service(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class QuestionGroup(models.Model):
    name = models.CharField(max_length=255)
    CLIENT_TYPES = [
        ('entrepreneur', 'Emprendedores'),
        ('business', 'Empresas'),
    ]
    client_type = models.CharField(max_length=20, choices=CLIENT_TYPES)

    def __str__(self):
        return f"{self.name} ({self.get_client_type_display()})"


class Question(models.Model):
    QUESTION_TYPES = [
        ('text', 'Texto'),
        ('radio', 'Opción única'),
        ('checkbox', 'Múltiples opciones'),
        ('number', 'Número'),
        ('yes_no', 'Sí/No'),
    ]
    group = models.ForeignKey('QuestionGroup', on_delete=models.CASCADE, related_name='questions')
    text = models.CharField(max_length=255)
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPES)
    required = models.BooleanField(default=True)
    services = models.ManyToManyField('Service', related_name='questions', blank=True)
    
    # Usamos JSONField para almacenar las opciones como una lista de diccionarios
    options = models.JSONField(default=list)

    def __str__(self):
        return self.text

    def get_options(self):
        # Método para obtener las opciones en un formato legible
        return self.options


class SurveyResponse(models.Model):
    lead = models.ForeignKey(User, on_delete=models.CASCADE, related_name='survey_responses')
    responses = models.JSONField()
    recommendations = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"SurveyResponse at {self.created_at}"

    def get_responses(self):
        formatted_responses = []
        for question_id, answer in self.responses.items():
            try:
                question = Question.objects.get(id=question_id)
                if question.question_type == 'text':
                    response_text = answer
                elif question.question_type in ['radio', 'checkbox', 'number', 'yes_no']:
                    if isinstance(answer, list):
                        response_text = ", ".join(
                            [str(question.options[idx]['text']) if idx < len(question.options) else "Índice fuera de rango" for idx in answer]
                        )
                    else:
                        response_text = question.options[answer]['text'] if answer < len(question.options) else "Índice fuera de rango"
                else:
                    response_text = str(answer)
                formatted_responses.append(f"#### {question.text}\n{response_text}\n")
            except Question.DoesNotExist:
                formatted_responses.append(f"#### Pregunta ID {question_id}\n{answer}\n")
        return "\n".join(formatted_responses)

    def get_recommendations(self):
        formatted_recommendations = []
        for recommendation in self.recommendations:
            formatted_recommendations.append(f"- {recommendation}")
        return "\n".join(formatted_recommendations)

class LeadEmprendimiento(models.Model):
    lead = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leads_emprendimiento')
    nombre = models.CharField(max_length=100)
    ubicacion = models.CharField(max_length=100)
    sector = models.CharField(max_length=100)
    años = models.IntegerField()
    empleados = models.IntegerField()
    informacion = models.TextField()
    audio = models.FileField(upload_to='user_audios/', blank=True, null=True)

    def __str__(self):
        return self.nombre
