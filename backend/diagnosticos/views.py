from django.http import JsonResponse
from .models import Question, SurveyResponse
import json

def get_entrepreneur_survey(request):
    if request.method == 'GET':
        # Obtener preguntas para emprendedores
        questions = Question.objects.filter(group__client_type='entrepreneur')
        data = []
        for question in questions:
            question_data = {
                'id': question.id,
                'text': question.text,
                'type': question.question_type,
                'required': question.required,
                'options': question.options  # Obtener las opciones del campo JSON
            }
            data.append(question_data)
        return JsonResponse({'success': True, 'questions': data})
    return JsonResponse({'success': False, 'message': 'Método no permitido'}, status=405)

def process_survey(request):
    try:
        data = json.loads(request.body)
        answers = data.get('answers', {})
        recommendations = []

        for question_id, selected_response in answers.items():
            try:
                question = Question.objects.get(id=question_id)  # Buscar la pregunta por ID
                options = question.options  # Obtener las opciones de la pregunta

                if question.question_type in ['radio', 'number', 'yes_no']:
                    # Convertir selected_response a entero
                    selected_index = int(selected_response)

                    if isinstance(options, list) and 0 <= selected_index < len(options):  # Verificar que 'options' es una lista y que el índice es válido
                        selected_option = options[selected_index]
                        value = selected_option.get('value', 0)  # Acceder al valor de la opción seleccionada

                        # Lógica de recomendaciones basada en el texto de la pregunta y la valoración
                        if "mvp" in question.text.lower() and value > 0:
                            recommendations.append("Considera un servicio para construir tu MVP.")
                        if "inversores" in question.text.lower() and value > 0:
                            recommendations.append("Un taller para mejorar tu pitch a inversores sería ideal.")
                        if "comunicación" in question.text.lower() and value > 0:
                            recommendations.append("Podemos ayudarte con habilidades de comunicación para ventas.")

                elif question.question_type == 'checkbox':
                    # selected_response es una lista de índices
                    if not isinstance(selected_response, list):
                        selected_response = [selected_response]  # Asegurarse de que es una lista
                    for selected_index in selected_response:
                        selected_index = int(selected_index)
                        if isinstance(options, list) and 0 <= selected_index < len(options):  # Verificar que 'options' es una lista y que el índice es válido
                            selected_option = options[selected_index]
                            value = selected_option.get('value', 0)  # Acceder al valor de la opción seleccionada

                            # Lógica de recomendaciones basada en el texto de la pregunta y la valoración
                            if "mvp" in question.text.lower() and value > 0:
                                recommendations.append("Considera un servicio para construir tu MVP.")
                            if "inversores" in question.text.lower() and value > 0:
                                recommendations.append("Un taller para mejorar tu pitch a inversores sería ideal.")
                            if "comunicación" in question.text.lower() and value > 0:
                                recommendations.append("Podemos ayudarte con habilidades de comunicación para ventas.")

                elif question.question_type == 'text':
                    # Almacenar la respuesta de tipo texto sin procesarla
                    response_text = selected_response
                    # Aquí puedes agregar lógica para almacenar o manejar la respuesta de tipo texto si es necesario

            except Question.DoesNotExist:
                continue  # Si la pregunta no existe, la ignoramos

        # Guardar las respuestas y recomendaciones en la base de datos
        SurveyResponse.objects.create(responses=answers, recommendations=recommendations)

        return JsonResponse({"success": True, "recommendations": recommendations})

    except json.JSONDecodeError:
        return JsonResponse({"success": False, "message": "Formato JSON inválido."}, status=400)
