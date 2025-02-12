from cuestionario.models import Recommendation

def get_recommendations(responses):
    """Obtiene las recomendaciones asociadas a las respuestas de opciones múltiples."""
    # Convertir dict_values a lista
    option_ids = list(responses)  # Ya es dict_values, no necesita .values()

    # Filtrar solo respuestas numéricas (evitar textos)
    option_ids = [resp for resp in option_ids if isinstance(resp, int)]

    # Obtener recomendaciones únicas asociadas a esas opciones
    recommendations = Recommendation.objects.filter(answer_options__id__in=option_ids).distinct()

    # Convertir a JSON
    return [{"id": rec.id, "text": rec.text} for rec in recommendations]


def generate_recommendations(responses):
    """Genera recomendaciones en base a las respuestas del usuario."""
    return get_recommendations(responses)
