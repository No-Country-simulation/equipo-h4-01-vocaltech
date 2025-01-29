from auth_service.models import User  # Ajusta según tu estructura de modelos
from diagnosticos.models import Question, Service  # Ajusta según tu estructura de modelos

def generar_recomendaciones_hibridas(respuestas_encuesta):
    recomendaciones = []

    # Obtener todas las preguntas de la base de datos que coincidan con las claves del JSON
    preguntas = Question.objects.filter(id__in=respuestas_encuesta.keys())

    # Análisis Individual
    servicios_recomendados = set()  # Para evitar duplicados
    for pregunta in preguntas:
        respuesta = respuestas_encuesta.get(str(pregunta.id))  # Obtener respuesta

        if respuesta is not None:
            if pregunta.question_type in ['radio', 'checkbox']:
                for opcion in pregunta.options:
                    if opcion["value"] == respuesta or (isinstance(respuesta, list) and opcion["value"] in respuesta):
                        servicios_recomendados.update(pregunta.services.all())
                        recomendaciones.append(
                            f"Basado en tu respuesta '{opcion['text']}', te recomendamos explorar el servicio: {', '.join([s.name for s in pregunta.services.all()])}"
                        )
            elif pregunta.question_type == 'yes_no' and respuesta == 1:
                servicios_recomendados.update(pregunta.services.all())
                recomendaciones.append(
                    f"Te recomendamos el servicio relacionado con '{pregunta.text}': {', '.join([s.name for s in pregunta.services.all()])}"
                )
            elif pregunta.question_type == 'number':
                recomendaciones.append(
                    f"Tu respuesta '{respuesta}' en '{pregunta.text}' indica un nivel de {respuesta}/5 en esta área."
                )

    # Análisis Global por Categoría
    categorias = {}
    for pregunta in preguntas:
        categoria = pregunta.category if pregunta.category else "General"
        if categoria not in categorias:
            categorias[categoria] = 0
        respuesta = respuestas_encuesta.get(str(pregunta.id), 0)
        categorias[categoria] += (pregunta.weight or 1) * (respuesta if isinstance(respuesta, (int, float)) else 0)

    for categoria, score in categorias.items():
        if score > 5:  # Umbral configurable
            recomendaciones.append(f"Prioriza los servicios relacionados con la categoría '{categoria}'.")

    # Evitar recomendaciones duplicadas basadas en servicios
    recomendaciones.extend([f"Considera el servicio: {s.name}" for s in servicios_recomendados])

    return recomendaciones
