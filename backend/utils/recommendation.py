from cuestionario.models import Recommendation, AnswerOption

def parse_responses(responses):
    """Convierte las respuestas en pares clave-valor para búsqueda de recomendaciones."""
    parsed_data = {}

    for question_id, user_response in responses.items():
        if isinstance(user_response, list):
            for option_id in user_response:
                parsed_data[f"{question_id}_{option_id}"] = None
                
        else:
            parsed_data[f"{question_id}_{user_response}"] = None

    print("Parsed Data:", parsed_data)
    return parsed_data

def get_recommendations(parsed_responses):
    """Busca las recomendaciones en base a los pares clave-valor generados."""
    recommendations = {}

    keys = list(parsed_responses.keys())
    answer_option_ids = [int(k.split('_')[1]) for k in keys]

    answer_options = AnswerOption.objects.filter(id__in=answer_option_ids)
    print("Answer Options:", answer_options)
    recs = Recommendation.objects.filter(answer_options__in=answer_options).distinct()
    print("Recommendations:", recs)

    rec_map = {}
    for rec in recs:
        for option in rec.answer_options.all():
            key = f"{option.question_id}_{option.id}"
            if key not in rec_map:
                rec_map[key] = []
            rec_map[key].append(rec.text)

    for key in keys:
        if key in rec_map:
            recommendations[key] = rec_map[key]

    print("Final Recommendations:", recommendations)
    return recommendations

def generate_recommendations(responses):
    """Genera recomendaciones en base a las respuestas del usuario."""
    parsed_responses = parse_responses(responses)
    recommendations = get_recommendations(parsed_responses)
    return recommendations