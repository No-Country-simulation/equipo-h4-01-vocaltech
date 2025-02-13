from collections import defaultdict
from cuestionario.models import Recommendation, AnswerOption, QuestionGroup

def get_recommendations_by_group(responses):
    """Obtiene las recomendaciones organizadas por grupo de preguntas, evitando duplicados."""
    option_ids = [resp for resp in responses if isinstance(resp, int)]  # Filtrar solo IDs numéricos

    # Obtener todas las recomendaciones asociadas a esas opciones
    recommendations = Recommendation.objects.filter(answer_options__id__in=option_ids).distinct()

    # Diccionario para agrupar recomendaciones por grupo sin duplicados
    grouped_recommendations = defaultdict(set)

    for rec in recommendations:
        for option in rec.answer_options.all():
            question_group = option.question.group  # Obtener el grupo de la pregunta
            grouped_recommendations[question_group.name].add((rec.id, rec.text))  # Usamos un set para evitar duplicados
    
    # Convertir el set en una lista de diccionarios para la salida JSON
    return {
        group_name: [{"id": rec_id, "text": rec_text} for rec_id, rec_text in recs]
        for group_name, recs in grouped_recommendations.items()
    }

def generate_recommendations(responses):
    """Genera recomendaciones en base a las respuestas del usuario, agrupadas por grupo de preguntas."""
    return get_recommendations_by_group(responses)
