from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets, filters
from rest_framework import status
from utils.pagination import StandardResultsSetPagination
from django_filters.rest_framework import DjangoFilterBackend
from .models import Question, SurveyResponse, LeadEmprendimiento
from .serializers import LeadEmprendimientoSerializer
import json


@api_view(['GET'])
def get_entrepreneur_survey(request):
    """
    Obtiene las preguntas de la encuesta para emprendedores.

    Método HTTP:
        GET

    Respuesta JSON:
        {
            "success": True,
            "questions": [
                {
                    "id": int,
                    "text": str,
                    "type": str,
                    "required": bool,
                    "options": list
                },
                ...
            ]
        }

    Respuesta de Error:
        {
            "success": False,
            "message": "Método no permitido"
        }
    """
    if request.method == 'GET':
        questions = Question.objects.filter(group__client_type='entrepreneur')
        data = []
        for question in questions:
            question_data = {
                'id': question.id,
                'text': question.text,
                'type': question.question_type,
                'required': question.required,
                'options': question.options
            }
            data.append(question_data)
        return Response({'success': True, 'questions': data}, status=status.HTTP_200_OK)
    return Response({'success': False, 'message': 'Método no permitido'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
def process_survey(request):
    """
    Procesa las respuestas de la encuesta y genera recomendaciones.

    Método HTTP:
        POST

    Cuerpo de la Solicitud:
        {
            "answers": {
                "question_id": respuesta,
                ...
            }
        }

    Respuesta JSON:
        {
            "success": True,
            "recommendations": list
        }

    Respuesta de Error:
        {
            "success": False,
            "message": "Formato JSON inválido."
        }
    """
    try:
        data = json.loads(request.body)
        answers = data.get('answers', {})
        recommendations = []

        for question_id, selected_response in answers.items():
            try:
                question = Question.objects.get(id=question_id)
                if question.question_type == 'text':
                    response_text = selected_response
                elif question.question_type in ['radio', 'checkbox', 'number', 'yes_no']:
                    if isinstance(selected_response, list):
                        response_text = ", ".join(
                            [str(question.options[idx]['text']) if idx < len(question.options) else "Índice fuera de rango" for idx in selected_response]
                        )
                    else:
                        response_text = question.options[selected_response]['text'] if selected_response < len(question.options) else "Índice fuera de rango"
                else:
                    response_text = str(selected_response)

                if "mvp" in question.text.lower() and response_text:
                    recommendations.append("Considera un servicio para construir tu MVP.")
                if "inversores" in question.text.lower() and response_text:
                    recommendations.append("Un taller para mejorar tu pitch a inversores sería ideal.")
                if "comunicación" in question.text.lower() and response_text:
                    recommendations.append("Podemos ayudarte con habilidades de comunicación para ventas.")

            except Question.DoesNotExist:
                continue

        SurveyResponse.objects.create(responses=answers, recommendations=recommendations)

        return Response({"success": True, "recommendations": recommendations}, status=status.HTTP_200_OK)

    except json.JSONDecodeError:
        return Response({"success": False, "message": "Formato JSON inválido."}, status=status.HTTP_400_BAD_REQUEST)


class LeadEmprendimientoViewSet(viewsets.ModelViewSet):
    queryset = LeadEmprendimiento.objects.all()
    serializer_class = LeadEmprendimientoSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['años', 'empleados']
    search_fields = ['nombre', 'ubicacion', 'sector', 'informacion']