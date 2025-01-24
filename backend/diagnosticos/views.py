from django.http import JsonResponse
from .models import Question

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


def process_entrepreneur_survey(request):
    if request.method == 'POST':
        answers = request.POST.dict()  # Obtener respuestas del formulario
        recommendations = []

        for key, value in answers.items():
            if key.startswith('question_'):
                question_id = int(key.split('_')[1])
                question = Question.objects.get(id=question_id)

                # Lógica de recomendaciones basada en preguntas
                if question.text.lower().find("confianza") != -1 and int(value) >= 4:
                    recommendations.append("Taller de confianza en comunicación.")
                if question.text.lower().find("equipo") != -1 and int(value) >= 4:
                    recommendations.append("Entrenamiento en liderazgo efectivo.")

        return JsonResponse({'success': True, 'recommendations': recommendations})

    return JsonResponse({'success': False, 'message': 'Método no permitido'}, status=405)
