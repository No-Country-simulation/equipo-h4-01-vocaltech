from rest_framework import serializers
from .models import Question

def generate_dynamic_serializer(client_type):
    class DynamicSerializer(serializers.Serializer):
        pass

    questions = Question.objects.filter(group__client_type=client_type).prefetch_related('options')
    for question in questions:
        if question.question_type == 'text':
            field = serializers.CharField(required=question.required)
        elif question.question_type == 'radio':
            choices = [(option.id, option.text) for option in question.options.all()]
            field = serializers.ChoiceField(choices=choices, required=question.required)
        elif question.question_type == 'checkbox':
            choices = [(option.id, option.text) for option in question.options.all()]
            field = serializers.ListField(
                child=serializers.ChoiceField(choices=choices),
                required=question.required
            )
        elif question.question_type == 'number':
            field = serializers.IntegerField(required=question.required)

        DynamicSerializer._declared_fields[f'question_{question.id}'] = field

    return DynamicSerializer
