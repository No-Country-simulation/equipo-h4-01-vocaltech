from cuestionario.models import Recommendation, Question, AnswerOption

def parse_responses(responses):
    """Convierte las respuestas en pares clave-valor para búsqueda de recomendaciones."""
    parsed_data = {}

    question_ids = responses.keys()
    questions = Question.objects.filter(id__in=question_ids).only("id", "question_type")

    question_map = {q.id: q for q in questions}

    for question_id, user_response in responses.items():
        question = question_map.get(int(question_id))

        if not question:
            continue  

        if question.question_type in ["radio", "yes_no"]:
            parsed_data[f"{question_id}_{user_response}"] = None  

        elif question.question_type == "checkbox":
            for option_id in user_response:
                parsed_data[f"{question_id}_{option_id}"] = None  

        elif question.question_type == "number":
            parsed_data[f"{question_id}_{int(user_response)}"] = None  

    return parsed_data

def get_recommendations(parsed_responses):
    """Busca las recomendaciones en base a los pares clave-valor generados."""
    recommendations = {}

    keys = list(parsed_responses.keys())
    question_ids = [int(k.split('_')[0]) for k in keys]
    answer_option_ids = [int(k.split('_')[1]) for k in keys]

    answer_options = AnswerOption.objects.filter(question_id__in=question_ids, id__in=answer_option_ids)
    recs = Recommendation.objects.filter(answer_options__in=answer_options).distinct()

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

    return recommendations

def generate_recommendations(responses):
    """Genera recomendaciones en base a las respuestas del usuario."""
    parsed_responses = parse_responses(responses)
    recommendations = get_recommendations(parsed_responses)
    return recommendations