from django import forms
from .models import Question, Recommendation, AnswerOption
from .serializers import QuestionSerializer

class QuestionForm(forms.ModelForm):
    class Meta:
        model = Question
        fields = ["text", "question_type", "group"]  # Campos base de la pregunta

    def save(self, commit=True):
        """Usa el serializer para manejar la creación y actualización de preguntas con opciones y recomendaciones."""
        instance = super().save(commit=False)  # No guardamos aún en la DB

        # Extraer datos de request.POST para serializar junto con la instancia
        data = {
            "id": instance.id,
            "text": self.cleaned_data["text"],
            "question_type": self.cleaned_data["question_type"],
            "group": self.cleaned_data["group"].id if self.cleaned_data["group"] else None,
            "options": self.data.get("options", [])  # Se espera que `options` venga en el request
        }

        serializer = QuestionSerializer(instance, data=data, partial=True)  # `partial=True` para actualizaciones

        if serializer.is_valid():
            return serializer.save()  # Guarda usando la lógica del serializer

        raise forms.ValidationError(serializer.errors)  # Lanza errores en caso de datos inválidos