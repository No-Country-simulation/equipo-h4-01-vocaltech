from diagnosticos.models import Question

def generar_recomendaciones_hibridas(survey_response):
    recomendaciones = []
    respuestas = survey_response.responses  # Respuestas en formato JSON
    preguntas = Question.objects.filter(group__client_type=survey_response.lead.role)
    
    # Análisis Individual
    servicios_recomendados = set()  # Para evitar duplicados
    for pregunta in preguntas:
        respuesta = respuestas.get(str(pregunta.id))
        if respuesta is not None:
            # Evaluar respuesta según el tipo de pregunta
            if pregunta.question_type in ['radio', 'checkbox']:
                for opcion in pregunta.options:
                    if opcion["value"] == respuesta:
                        servicios_recomendados.update(pregunta.services.all())
                        recomendaciones.append(
                            f"Basado en tu respuesta '{opcion['text']}', te recomendamos explorar el servicio: {', '.join([s.name for s in pregunta.services.all()])}"
                        )
            elif pregunta.question_type == 'yes_no' and respuesta == 1:
                servicios_recomendados.update(pregunta.services.all())
                recomendaciones.append(
                    f"Te recomendamos el servicio relacionado con '{pregunta.text}': {', '.join([s.name for s in pregunta.services.all()])}"
                )
    
    # Análisis Global
    categorias = {}
    for pregunta in preguntas:
        categoria = pregunta.group.name
        if categoria not in categorias:
            categorias[categoria] = 0
        respuesta = respuestas.get(str(pregunta.id), 0)
        categorias[categoria] += (pregunta.weight or 1) * respuesta  # Asignar peso predeterminado si no existe

    for categoria, score in categorias.items():
        if score > 5:  # Umbral configurable
            recomendaciones.append(f"Prioriza los servicios relacionados con la categoría {categoria}.")

    # Evitar recomendaciones duplicadas basadas en servicios
    recomendaciones.extend([f"Considera el servicio: {s.name}" for s in servicios_recomendados])

    return recomendaciones
