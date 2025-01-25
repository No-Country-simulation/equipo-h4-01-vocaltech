from django.contrib import admin
from django import forms
from django.urls import path
from .models import Question, Service, QuestionGroup, SurveyResponse

class QuestionForm(forms.ModelForm):
    options_input = forms.CharField(widget=forms.Textarea, required=False, help_text="Ingrese las opciones separadas por salto de línea. Use ':' para separar la opción de su valoración.")

    class Meta:
        model = Question
        fields = ['group', 'text', 'question_type', 'required', 'services', 'options']

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

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(QuestionGroup)
class QuestionGroupAdmin(admin.ModelAdmin):
    list_display = ('name', 'client_type')
    list_filter = ('client_type',)

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('text', 'group', 'question_type', 'required')
    list_filter = ('group', 'question_type',)
    search_fields = ('text',)
    filter_horizontal = ('services',)
    fields = ('group', 'text', 'question_type', 'required', 'services', 'options')

@admin.register(SurveyResponse)
class SurveyResponseAdmin(admin.ModelAdmin):
    list_display = ('created_at', 'get_responses', 'get_recommendations')
    list_filter = ('created_at',)
    search_fields = ('responses',)
    date_hierarchy = 'created_at'
    readonly_fields = ('get_responses', 'get_recommendations')
    exclude = ('responses', 'recommendations')

    def has_add_permission(self, request, obj=None):
        return False

    def has_change_permission(self, request, obj=None):
        if obj is not None:
            return False
        return super().has_change_permission(request, obj=obj)

    def has_delete_permission(self, request, obj=None):
        #Disable delete
        return False

    def get_responses(self, obj):
        return obj.get_responses()
    get_responses.short_description = 'Responses'

    def get_recommendations(self, obj):
        return obj.get_recommendations()
    get_recommendations.short_description = 'Recommendations'