from django import forms
from .models import Question

class QuestionForm(forms.ModelForm):
    options_input = forms.CharField(widget=forms.Textarea, required=False, help_text="Ingrese las opciones separadas por salto de línea. Use ':' para separar la opción de su valoración.")

    class Meta:
        model = Question
        fields = ['text', 'question_type', 'required', 'services', 'options']

    def save(self, commit=True):
        question = super().save(commit=False)
        options_input = self.cleaned_data.get('options_input')

        if options_input:
            options = []
            for option_text in options_input.splitlines():
                parts = option_text.split(':')
                if len(parts) == 2:
                    text = parts[0].strip()
                    try:
                        value = int(parts[1].strip())  # Valoración de la opción
                    except ValueError:
                        value = 0  # Si no se puede convertir a entero, usar 0
                else:
                    text = parts[0].strip()
                    value = 0  # Si no hay valoración, usar 0

                options.append({'text': text, 'value': value})

            question.options = options  # Asignar las opciones al campo JSON

        if commit:
            question.save()
        return question
